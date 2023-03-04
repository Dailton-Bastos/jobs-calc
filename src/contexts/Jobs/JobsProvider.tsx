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

import { Cycle } from '~/@types/cycles';
import {
  CreateNewJobData,
  FirestoreTimestamp,
  Job,
  JobType,
  JobsProviderProps,
} from '~/@types/job';
import { db, serverTimestamp } from '~/config/firebase';
import { useAuth } from '~/hooks/useAuth';
import {
  addNewJobActions,
  createInitialStateActions,
  setActiveJobActions,
} from '~/reducers/jobs/actions';
import { initialJobsState, jobsReducer } from '~/reducers/jobs/reducer';

import { JobsContext } from './JobsContext';

export const JobsProvider = ({ children }: JobsProviderProps) => {
  const [jobsState, dispatch] = React.useReducer(jobsReducer, initialJobsState);
  const [cycle, setCycle] = React.useState<Cycle | null>(null);

  const { jobs, activeJob } = jobsState;

  const [amountSecondsPassed, setAmountSecondsPassed] = React.useState(() => {
    if (activeJob?.startDate) {
      return differenceInSeconds(
        new Date(),
        new Date(Number(activeJob?.startDate)),
      );
    }

    return 0;
  });

  const { user } = useAuth();
  const userId = user?.uid;

  const navigate = useNavigate();

  const createNewJob = React.useCallback(
    (data: CreateNewJobData) => {
      if (!userId) return;

      const dateInServerTimestamp = serverTimestamp() as FirestoreTimestamp;

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
        startDate: dateInServerTimestamp,
        createdAt: dateInServerTimestamp,
        updatedAt: dateInServerTimestamp,
      };

      const { key: jobKey }: ThenableReference = push(ref(db, 'jobs'), newJob);

      if (!jobKey) return;

      const dateInTimestamp = new Date().getTime();

      dispatch(
        addNewJobActions({
          ...newJob,
          id: jobKey,
          startDate: dateInTimestamp,
          createdAt: dateInTimestamp,
          updatedAt: dateInTimestamp,
        }),
      );

      const newCycle: Cycle = {
        id: null,
        jobId: jobKey,
        userId: userId,
        isActive: true,
        startDate: dateInServerTimestamp,
      };

      const { key: cycleKey } = push(ref(db, 'cycles'), newCycle);

      if (cycleKey) {
        setCycle({
          ...newCycle,
          id: cycleKey,
          startDate: dateInTimestamp,
        });
      }

      navigate(`/jobs/${jobKey}`);
    },
    [userId, navigate],
  );

  const updateJob = React.useCallback((key: string, data: Job) => {
    if (!key) return;

    set(ref(db, `jobs/${key}`), {
      ...data,
    });
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
      cycle,
      fetchJob,
      activeJob,
      updateActiveJob,
      amountSecondsPassed,
      setSecondsPassed,
      updateJob,
    }),
    [
      jobs,
      createNewJob,
      cycle,
      fetchJob,
      activeJob,
      updateActiveJob,
      amountSecondsPassed,
      setSecondsPassed,
      updateJob,
    ],
  );

  return <JobsContext.Provider value={values}>{children}</JobsContext.Provider>;
};
