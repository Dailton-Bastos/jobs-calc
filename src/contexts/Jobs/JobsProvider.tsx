import React from 'react';
import { useNavigate } from 'react-router-dom';

import { differenceInSeconds } from 'date-fns';
import {
  ref,
  push,
  child,
  get,
  query,
  orderByChild,
  equalTo,
  onValue,
} from 'firebase/database';
import type { DatabaseReference } from 'firebase/database';

import {
  CreateNewJobData,
  FirestoreTimestamp,
  Job,
  JobType,
  JobsProviderProps,
} from '~/@types/job';
import { db, serverTimestamp } from '~/config/firebase';
import { uuid } from '~/helpers/utils';
import { useAuth } from '~/hooks/useAuth';
import {
  addNewJobActions,
  createInitialStateActions,
} from '~/reducers/jobs/actions';
import { initialJobsState, jobsReducer } from '~/reducers/jobs/reducer';

import { JobsContext } from './JobsContext';

export const JobsProvider = ({ children }: JobsProviderProps) => {
  const [jobsState, dispatch] = React.useReducer(jobsReducer, initialJobsState);
  const [job, setJob] = React.useState<Job | null>(null);

  const [amountSecondsPassed, setAmountSecondsPassed] = React.useState(() => {
    if (job?.startDate) {
      return differenceInSeconds(new Date(), new Date(Number(job?.startDate)));
    }

    return 0;
  });

  const { user } = useAuth();
  const userId = user?.uid;

  const { jobs } = jobsState;

  const navigate = useNavigate();

  const createNewJob = React.useCallback(
    async (data: CreateNewJobData) => {
      const newJob: Job = {
        id: uuid(),
        jobberId: data.jobberId,
        userId: user?.uid,
        type: data.type as JobType,
        title: data.title,
        status: 'opened',
        hourEstimate: data.hourEstimate,
        minutesEstimate: data.minutesEstimate,
        totalMinutesAmount: data.totalMinutesAmount,
        description: data.description,
        startDate: serverTimestamp() as FirestoreTimestamp,
        createdAt: serverTimestamp() as FirestoreTimestamp,
        updatedAt: serverTimestamp() as FirestoreTimestamp,
      };

      const reference: DatabaseReference = await push(ref(db, 'jobs'), newJob);

      if (reference) {
        dispatch(addNewJobActions(newJob));

        navigate(`/jobs/${newJob.id}`);
      }
    },
    [user, navigate],
  );

  const createInitialState = React.useCallback(async () => {
    if (!userId) return;

    const snapshot = await get(
      query(child(ref(db), 'jobs'), orderByChild('userId'), equalTo(userId)),
    );

    const jobsList: Job[] = [];

    if (snapshot && snapshot.exists()) {
      const data = snapshot.val();

      for (const id in data) {
        jobsList.push({ id, ...data[id] });
      }
    }

    dispatch(createInitialStateActions(jobsList));
  }, [userId]);

  const fetchJob = React.useCallback((id: string) => {
    if (!id) return;

    const jobRef = query(ref(db, 'jobs'), orderByChild('id'), equalTo(id));

    onValue(jobRef, (snapshot) => {
      if (snapshot && snapshot.exists()) {
        const data = snapshot.val();

        for (const key in data) {
          setJob({ ...data[key] });
        }
      }
    });
  }, []);

  const setSecondsPassed = React.useCallback((seconds: number) => {
    setAmountSecondsPassed(seconds);
  }, []);

  React.useEffect(() => {
    createInitialState();
  }, [createInitialState]);

  const values = React.useMemo(
    () => ({
      jobs,
      createNewJob,
      fetchJob,
      job,
      amountSecondsPassed,
      setSecondsPassed,
    }),
    [jobs, createNewJob, fetchJob, job, amountSecondsPassed, setSecondsPassed],
  );

  return <JobsContext.Provider value={values}>{children}</JobsContext.Provider>;
};
