import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  ref,
  push,
  child,
  get,
  set,
  query,
  orderByChild,
  equalTo,
  onValue,
  ThenableReference,
} from 'firebase/database';

import { Cycle } from '~/@types/cycles';
import {
  CreateNewJobData,
  Job,
  JobResum,
  JobType,
  JobsProviderProps,
} from '~/@types/job';
import { db } from '~/config/firebase';
import { getJobStatus, getJobType, secondsToTime } from '~/helpers/utils';
import { useAuth } from '~/hooks/useAuth';
import {
  addNewJobActions,
  createInitialStateActions,
  setActiveJobActions,
  updateJobActions,
} from '~/reducers/jobs/actions';
import { initialJobsState, jobsReducer } from '~/reducers/jobs/reducer';

import { JobsContext } from './JobsContext';

export const JobsProvider = ({ children }: JobsProviderProps) => {
  const [jobsState, dispatch] = React.useReducer(jobsReducer, initialJobsState);
  const [newCycle, setNewCycle] = React.useState<Cycle | null>(null);
  const [myJobs, setMyJobs] = React.useState<JobResum[]>([]);

  const { jobs, activeJob } = jobsState;

  const { user } = useAuth();
  const userId = user?.uid;

  const navigate = useNavigate();

  const createNewJob = React.useCallback(
    (data: CreateNewJobData) => {
      if (!userId) return;

      const dateInTimestamp = new Date().getTime();

      const newJob: Job = {
        id: null,
        jobberId: data.jobberId,
        userId,
        type: data.type as JobType,
        title: data.title,
        status: 'developing',
        hourEstimate: data.hourEstimate,
        minutesEstimate: data.minutesEstimate,
        totalSecondsAmount: data.totalSecondsAmount,
        totalSecondsRemaining: data.totalSecondsAmount,
        description: data.description,
        isHighlight: data?.isHighlight,
        createdAt: dateInTimestamp,
        updatedAt: dateInTimestamp,
      };

      const { key: jobKey }: ThenableReference = push(ref(db, 'jobs'), newJob);

      if (!jobKey) return;

      dispatch(
        addNewJobActions({
          ...newJob,
          id: jobKey,
          createdAt: dateInTimestamp,
          updatedAt: dateInTimestamp,
        }),
      );

      const cycle: Cycle = {
        id: null,
        jobId: jobKey,
        userId: userId,
        isActive: true,
        startDate: dateInTimestamp,
      };

      const { key: cycleKey } = push(ref(db, 'cycles'), cycle);

      if (cycleKey) {
        setNewCycle({
          ...cycle,
          id: cycleKey,
          startDate: dateInTimestamp,
        });
      }

      navigate(`/jobs/${jobKey}`);
    },
    [userId, navigate],
  );

  const updateJob = React.useCallback((job: Job) => {
    if (!job.id) return;

    const dateInTimestamp = new Date().getTime();

    set(ref(db, `jobs/${job.id}`), {
      ...job,
      updatedAt: dateInTimestamp,
    });

    dispatch(
      updateJobActions({
        ...job,
        updatedAt: dateInTimestamp,
      }),
    );
  }, []);

  const createInitialState = React.useCallback(async () => {
    if (!userId) return;

    const snapshot = await get(
      query(child(ref(db), 'jobs'), orderByChild('userId'), equalTo(userId)),
    );

    const jobsList: Job[] = [];

    if (snapshot && snapshot.exists()) {
      const data = snapshot.val();

      for (const property in data) {
        jobsList.push({ id: property, ...data[property] });
      }
    }

    dispatch(createInitialStateActions(jobsList));
  }, [userId]);

  const fetchJob = React.useCallback((key: string) => {
    if (!key) return;

    onValue(ref(db, `jobs/${key}`), (snapshot) => {
      if (snapshot && snapshot.exists()) {
        const data: Job = snapshot.val();

        if (!snapshot.key) return;

        dispatch(setActiveJobActions({ ...data, id: snapshot.key }));
      }
    });
  }, []);

  const updateActiveJob = React.useCallback((job: Job) => {
    dispatch(setActiveJobActions(job));
  }, []);

  React.useEffect(() => {
    const jobsReums: JobResum[] = [...jobs]
      .sort((a, b) => b?.createdAt - a?.createdAt)
      .map((job) => {
        const { hours, minutes } = secondsToTime(job.totalSecondsAmount);

        return {
          id: job?.id ?? '',
          title: job.title,
          estimatedTime: `${hours}h:${minutes}m`,
          type: getJobType(job.type),
          status: getJobStatus(job.status),
        };
      });

    setMyJobs(jobsReums);
  }, [jobs]);

  React.useEffect(() => {
    createInitialState();
  }, [createInitialState]);

  const values = React.useMemo(
    () => ({
      jobs,
      createNewJob,
      newCycle,
      fetchJob,
      activeJob,
      updateActiveJob,
      updateJob,
      myJobs,
    }),
    [
      jobs,
      createNewJob,
      newCycle,
      fetchJob,
      activeJob,
      updateActiveJob,
      updateJob,
      myJobs,
    ],
  );

  return <JobsContext.Provider value={values}>{children}</JobsContext.Provider>;
};
