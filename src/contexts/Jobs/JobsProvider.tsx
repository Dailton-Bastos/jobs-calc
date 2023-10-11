import React from 'react';
import { useNavigate } from 'react-router-dom';

import { UseToastOptions, useToast } from '@chakra-ui/react';
import { ref, push, set, onValue, ThenableReference } from 'firebase/database';

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
import { useInitialJobsState } from '~/hooks/useInitialJobsState';
import {
  addNewJobActions,
  deleteJobActions,
  setActiveJobActions,
  updateJobActions,
} from '~/reducers/jobs/actions';

import { JobsContext } from './JobsContext';

export const JobsProvider = ({ children }: JobsProviderProps) => {
  const [newCycle, setNewCycle] = React.useState<Cycle | null>(null);
  const [myJobs, setMyJobs] = React.useState<JobResum[]>([]);

  const { state, dispatch, createInitialState } = useInitialJobsState();

  const { jobs, activeJob } = state;

  const { user } = useAuth();
  const userId = user?.uid;

  const navigate = useNavigate();
  const toast = useToast();

  const showToast = React.useCallback(
    (options: UseToastOptions) => {
      const id = 'customToast';

      if (!toast.isActive(id)) {
        return toast({
          ...options,
          variant: 'left-accent',
          position: 'bottom-left',
          isClosable: true,
        });
      }
    },
    [toast],
  );

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
    [userId, navigate, dispatch],
  );

  const updateJob = React.useCallback(
    async (job: Job) => {
      if (!job.id) return;

      try {
        const jobData = {
          ...job,
          updatedAt: new Date().getTime(),
        };

        await set(ref(db, `jobs/${job.id}`), jobData);

        dispatch(updateJobActions(jobData));
        showToast({
          title: 'Job atualizado',
          description: 'Informações salvas com sucesso.',
          status: 'success',
        });
      } catch (error) {
        showToast({
          title: 'Ocorreu um erro',
          description: 'Tente novamente, por favor.',
          status: 'error',
        });

        throw new Error('Erro to update job');
      }
    },
    [showToast, dispatch],
  );

  const fetchJob = React.useCallback(
    (key: string) => {
      if (!key) return;

      onValue(ref(db, `jobs/${key}`), (snapshot) => {
        if (snapshot && snapshot.exists()) {
          const val: Job = snapshot.val();

          if (!snapshot.key) return;

          dispatch(setActiveJobActions({ ...val, id: snapshot.key }));
        }
      });
    },
    [dispatch],
  );

  const updateActiveJob = React.useCallback(
    (job: Job) => {
      dispatch(setActiveJobActions(job));
    },
    [dispatch],
  );

  const deleteJob = React.useCallback(
    (id: string) => {
      dispatch(deleteJobActions(id));
    },
    [dispatch],
  );

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
    if (!user) return;

    createInitialState(user?.uid);
  }, [createInitialState, user]);

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
      deleteJob,
      showToast,
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
      deleteJob,
      showToast,
    ],
  );

  return <JobsContext.Provider value={values}>{children}</JobsContext.Provider>;
};
