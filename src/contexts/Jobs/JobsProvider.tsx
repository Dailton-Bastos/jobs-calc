import React from 'react';
import { useNavigate } from 'react-router-dom';

import { differenceInSeconds } from 'date-fns';
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

import {
  CreateNewJobData,
  FirestoreTimestamp,
  Job,
  JobType,
  JobsProviderProps,
  Cycle,
  CreateNewCycleJobData,
} from '~/@types/job';
import { db, serverTimestamp } from '~/config/firebase';
import { useAuth } from '~/hooks/useAuth';
import {
  addNewCycleJobActions,
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

  const { jobs, cycles } = jobsState;

  const navigate = useNavigate();

  const activeCycle = React.useMemo(() => {
    return !!job?.startDate;
  }, [job]);

  const createNewCycleJob = React.useCallback((data: CreateNewCycleJobData) => {
    const newCycle: Cycle = { id: null, ...data };

    const reference: ThenableReference = push(ref(db, 'cycles'), newCycle);

    if (reference.key) {
      dispatch(addNewCycleJobActions(newCycle));
    }
  }, []);

  const createNewJob = React.useCallback(
    (data: CreateNewJobData) => {
      if (!userId) return;

      const startDate = serverTimestamp() as FirestoreTimestamp;

      const newJob: Job = {
        id: null,
        jobberId: data.jobberId,
        userId,
        type: data.type as JobType,
        title: data.title,
        status: 'developing',
        hourEstimate: data.hourEstimate,
        minutesEstimate: data.minutesEstimate,
        totalMinutesAmount: data.totalMinutesAmount,
        description: data.description,
        startDate,
        createdAt: serverTimestamp() as FirestoreTimestamp,
        updatedAt: serverTimestamp() as FirestoreTimestamp,
      };

      const reference: ThenableReference = push(ref(db, 'jobs'), newJob);

      if (!reference.key) return;

      const newCycle: Cycle = {
        id: null,
        jobId: reference.key,
        userId,
        startDate,
      };

      dispatch(addNewJobActions(newJob));

      createNewCycleJob(newCycle);

      navigate(`/jobs/${reference.key}`);
    },
    [userId, navigate, createNewCycleJob],
  );

  const updateJob = React.useCallback((key: string, data: Job) => {
    if (!key) return;

    set(ref(db, `jobs/${key}`), {
      ...data,
    });
  }, []);

  const createInitialState = React.useCallback(async () => {
    if (!userId) return;

    const jobsData = get(
      query(child(ref(db), 'jobs'), orderByChild('userId'), equalTo(userId)),
    );

    const cyclesData = get(
      query(child(ref(db), 'cycles'), orderByChild('userId'), equalTo(userId)),
    );

    const [snapshotJobs, snapshotCycles] = await Promise.all([
      jobsData,
      cyclesData,
    ]);

    const jobsList: Job[] = [];
    const cyclesList: Cycle[] = [];

    if (snapshotJobs && snapshotJobs.exists()) {
      const data = snapshotJobs.val();

      for (const property in data) {
        jobsList.push({ id: property, ...data[property] });
      }
    }

    if (snapshotCycles && snapshotCycles.exists()) {
      const data = snapshotCycles.val();

      for (const property in data) {
        cyclesList.push({ id: property, ...data[property] });
      }
    }

    dispatch(createInitialStateActions(jobsList, cyclesList));
  }, [userId]);

  const fetchJob = React.useCallback((key: string) => {
    if (!key) return;

    onValue(ref(db, `jobs/${key}`), (snapshot) => {
      if (snapshot && snapshot.exists()) {
        const data: Job = snapshot.val();

        setJob({
          ...data,
          id: snapshot.key,
        });
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
      cycles,
      createNewCycleJob,
      activeCycle,
      updateJob,
    }),
    [
      jobs,
      createNewJob,
      fetchJob,
      job,
      amountSecondsPassed,
      setSecondsPassed,
      cycles,
      createNewCycleJob,
      activeCycle,
      updateJob,
    ],
  );

  return <JobsContext.Provider value={values}>{children}</JobsContext.Provider>;
};
