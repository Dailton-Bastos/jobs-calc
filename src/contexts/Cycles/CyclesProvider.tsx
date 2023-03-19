import React from 'react';

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
  ThenableReference,
} from 'firebase/database';

import type {
  CreateNewCycleJobData,
  Cycle,
  CyclesProviderProps,
  JobCycles,
  JobCyclesByDate,
} from '~/@types/cycles';
import { db } from '~/config/firebase';
import { formatJobCyclesByDate, groupBy, secondsToTime } from '~/helpers/utils';
import { useAuth } from '~/hooks/useAuth';
import { useCycle } from '~/hooks/useCycle';
import { useJobsContext } from '~/hooks/useJobsContext';
import {
  addNewCycleJobActions,
  createInitialStateActions,
  finishCurrentCycleActions,
} from '~/reducers/cycles/actions';
import { CyclesReducer, initialCyclesState } from '~/reducers/cycles/reducer';

import { CyclesContext } from './CyclesContext';

export const CyclesProvider = ({ children }: CyclesProviderProps) => {
  const [countdownText, setCountdownText] = React.useState('00:00:00');
  const [countdownTextActiveCycle, setCountdownTextActiveCycle] =
    React.useState('00:00:00');

  const [jobCycles, setJobCycles] = React.useState<JobCycles[]>([]);

  const [cyclesState, dispatch] = React.useReducer(
    CyclesReducer,
    initialCyclesState,
  );

  const { user } = useAuth();

  const { newCycle, activeJob, updateJob, jobs, updateActiveJob } =
    useJobsContext();

  const {
    formatJobCycles,
    getJobTotalHoursUsed,
    getTotalHoursUsedActiveCycleJob,
    getActiveCycleInfo,
  } = useCycle();

  const { cyclesByUser, activeCycleId } = cyclesState;

  const activeCycle = React.useMemo(() => {
    return cyclesByUser.find((cycle) => cycle.id === activeCycleId);
  }, [activeCycleId, cyclesByUser]);

  const activeCycleJob = React.useMemo(() => {
    const job = jobs?.find((item) => item.id === activeCycle?.jobId);

    return job;
  }, [jobs, activeCycle]);

  const [amountSecondsPassed, setAmountSecondsPassed] = React.useState(() => {
    if (activeCycle?.startDate) {
      return differenceInSeconds(new Date(), new Date(activeCycle?.startDate));
    }

    return 0;
  });

  const cyclesFromActiveCycleJob = cyclesByUser.filter((cycle) => {
    return cycle?.jobId === activeCycle?.jobId;
  });

  const { jobTotalHoursUsed } = getJobTotalHoursUsed(jobCycles);
  const { totalHoursUsedActiveCycleJob } = getTotalHoursUsedActiveCycleJob(
    cyclesFromActiveCycleJob,
  );
  const activeCycleInfo = getActiveCycleInfo(
    activeCycleJob,
    countdownTextActiveCycle,
  );

  const activeCycleTotalSeconds = React.useMemo(() => {
    return activeJob ? activeJob?.totalSecondsRemaining : 0;
  }, [activeJob]);

  const activeCycleCurrentSeconds = React.useMemo(() => {
    return activeCycleTotalSeconds - amountSecondsPassed;
  }, [activeCycleTotalSeconds, amountSecondsPassed]);

  const countdownValue = React.useCallback(() => {
    const isDifec = activeCycle && activeCycle.jobId !== activeJob?.id;

    const amountSeconds = isDifec
      ? jobTotalHoursUsed
      : jobTotalHoursUsed + amountSecondsPassed;

    const currentSeconds = isDifec
      ? activeCycleTotalSeconds
      : activeCycleCurrentSeconds;

    const totalCount =
      activeCycleCurrentSeconds >= 1 ? currentSeconds : amountSeconds;

    const { formattedTime } = secondsToTime(totalCount);

    setCountdownText(formattedTime);
  }, [
    activeCycleCurrentSeconds,
    jobTotalHoursUsed,
    activeCycleTotalSeconds,
    amountSecondsPassed,
    activeCycle,
    activeJob,
  ]);

  const countdownValueActiveCycle = React.useCallback(() => {
    const totalSecondsRemaining = activeCycleJob?.totalSecondsRemaining ?? 0;

    const jobCurrentSeconds = totalSecondsRemaining - amountSecondsPassed;

    const totalCount =
      jobCurrentSeconds >= 1
        ? jobCurrentSeconds
        : totalHoursUsedActiveCycleJob + amountSecondsPassed;

    const { formattedTime } = secondsToTime(totalCount);

    setCountdownTextActiveCycle(formattedTime);
  }, [activeCycleJob, amountSecondsPassed, totalHoursUsedActiveCycleJob]);

  const createNewCycleJob = React.useCallback(
    (data: CreateNewCycleJobData) => {
      if (!user) return;

      const dateInTimestamp = new Date().getTime();

      const cycle: Cycle = {
        id: null,
        jobId: data.jobId,
        userId: user.uid,
        isActive: true,
        startDate: dateInTimestamp,
      };

      const { key }: ThenableReference = push(ref(db, 'cycles'), cycle);

      if (!key) return;

      const newCycleData = {
        ...cycle,
        id: key,
        startDate: dateInTimestamp,
      };

      dispatch(addNewCycleJobActions(newCycleData));
    },
    [user],
  );

  const createInitialState = React.useCallback(async () => {
    if (!user) return;

    const snapshot = await get(
      query(
        child(ref(db), 'cycles'),
        orderByChild('userId'),
        equalTo(user?.uid),
      ),
    );

    const cyclesList: Cycle[] = [];

    if (snapshot && snapshot.exists()) {
      const data = snapshot.val();

      for (const property in data) {
        cyclesList.push({ id: property, ...data[property] });
      }
    }

    const currentActiveCycle = cyclesList?.find((cycle) => cycle.isActive);

    const initialStateData = {
      cyclesByUser: cyclesList,
      activeCycle: currentActiveCycle,
    };

    dispatch(createInitialStateActions(initialStateData));
  }, [user]);

  const updateCycle = React.useCallback(async (cycle: Cycle) => {
    if (!cycle.id) return;

    const dateInTimestamp = new Date().getTime();

    return set(ref(db, `cycles/${cycle.id}`), {
      ...cycle,
      isActive: false,
      fineshedDate: dateInTimestamp,
    });
  }, []);

  const finishCurrentCycle = React.useCallback(
    (cycle: Cycle) => {
      if (!activeJob) return;

      setAmountSecondsPassed(0);

      updateCycle(cycle);

      updateJob({
        ...activeJob,
        totalSecondsRemaining: activeCycleCurrentSeconds,
      });

      dispatch(finishCurrentCycleActions());
    },
    [updateCycle, updateJob, activeJob, activeCycleCurrentSeconds],
  );

  // Start Countdown
  React.useEffect(() => {
    if (!activeCycle) {
      setAmountSecondsPassed(0);

      return;
    }

    const interval = setInterval(() => {
      const secondsDifference = differenceInSeconds(
        new Date(),
        new Date(activeCycle?.startDate),
      );

      setAmountSecondsPassed(secondsDifference);
    }, 1000);

    return () => clearInterval(interval);
  }, [activeCycle, activeCycleTotalSeconds]);

  // Change Countdown Text
  React.useEffect(() => {
    countdownValue();
  }, [countdownValue]);

  // Countdown Text Active Cycle
  React.useEffect(() => {
    countdownValueActiveCycle();
  }, [countdownValueActiveCycle]);

  // Job Cycles Filtered by Date
  React.useEffect(() => {
    const activeJobId = activeJob?.id ?? '';

    const { cycles } = formatJobCycles(cyclesByUser, activeJobId);

    const groupByDate: JobCyclesByDate = groupBy(cycles, 'date');

    const { data } = formatJobCyclesByDate(groupByDate);

    setJobCycles(data);
  }, [cyclesByUser, activeJob, formatJobCycles]);

  React.useEffect(() => {
    if (newCycle) {
      dispatch(addNewCycleJobActions(newCycle));
    }
  }, [newCycle]);

  React.useEffect(() => {
    if (activeCycleJob) {
      updateActiveJob(activeCycleJob);
    }
  }, [activeCycleJob, updateActiveJob]);

  React.useEffect(() => {
    createInitialState();
  }, [createInitialState]);

  const values = React.useMemo(
    () => ({
      createNewCycleJob,
      finishCurrentCycle,
      activeCycle,
      activeCycleTotalSeconds,
      activeCycleCurrentSeconds,
      jobTotalHoursUsed,
      jobCycles,
      countdownText,
      activeCycleInfo,
    }),
    [
      createNewCycleJob,
      finishCurrentCycle,
      activeCycle,
      activeCycleTotalSeconds,
      activeCycleCurrentSeconds,
      jobTotalHoursUsed,
      jobCycles,
      countdownText,
      activeCycleInfo,
    ],
  );

  return (
    <CyclesContext.Provider value={values}>{children}</CyclesContext.Provider>
  );
};
