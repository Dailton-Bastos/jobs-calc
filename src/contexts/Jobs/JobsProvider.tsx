import React from 'react';
import { useNavigate } from 'react-router-dom';

import { UseToastOptions, useToast } from '@chakra-ui/react';
import { ref, push, set, onValue, ThenableReference } from 'firebase/database';

import { Cycle } from '~/@types/cycles';
import type {
  JobsProviderProps,
  JobData,
  JobFormatted,
  Job,
} from '~/@types/job';
import { db } from '~/config/firebase';
import { useAuth } from '~/hooks/useAuth';
import { useInitialJobsState } from '~/hooks/useInitialJobsState';
import { useJobs } from '~/hooks/useJobs';
import { addNewJobActions, deleteJobActions } from '~/reducers/jobs/actions';

import { JobsContext } from './JobsContext';

export const JobsProvider = ({ children }: JobsProviderProps) => {
  const [newCycle, setNewCycle] = React.useState<Cycle | null>(null);

  const { state, dispatch, createInitialState } = useInitialJobsState();

  const { jobs, activeJob } = state;

  const { formatJob } = useJobs();

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
    (data: JobData) => {
      if (!userId) return;

      const { key: id }: ThenableReference = push(ref(db, 'jobs'), data);

      if (!id) return;

      const jobAction = formatJob({ id, ...data }, []);

      dispatch(addNewJobActions(jobAction));

      const dateInTimestamp = new Date().getTime();

      const cycle: Cycle = {
        id: null,
        jobId: id,
        userId,
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

      navigate(`/jobs/${id}`);
    },
    [navigate, dispatch, userId, formatJob],
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

        // dispatch(updateJobActions(jobData));
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
    [showToast],
  );

  const fetchJob = React.useCallback((key: string) => {
    if (!key) return;

    onValue(ref(db, `jobs/${key}`), (snapshot) => {
      if (snapshot && snapshot.exists()) {
        // const val: Job = snapshot.val();

        if (!snapshot.key) return;

        // dispatch(setActiveJobActions({ ...val, id: snapshot.key }));
      }
    });
  }, []);

  const updateActiveJob = React.useCallback((job: JobFormatted) => {
    // dispatch(setActiveJobActions(job));
    return;
    job;
  }, []);

  const deleteJob = React.useCallback(
    (id: string) => {
      dispatch(deleteJobActions(id));
    },
    [dispatch],
  );

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
      deleteJob,
      showToast,
    ],
  );

  return <JobsContext.Provider value={values}>{children}</JobsContext.Provider>;
};
