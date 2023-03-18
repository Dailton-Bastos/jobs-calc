import React from 'react';

import { differenceInSeconds, format } from 'date-fns';
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
  serverTimestamp,
} from 'firebase/database';

import type {
  CreateNewCycleJobData,
  Cycle,
  CyclesProviderProps,
  FilteredCycle,
  FirestoreTimestamp,
  GroupByDate,
  CycleByDate,
  ActiveCycleInfo,
} from '~/@types/cycles';
import { db } from '~/config/firebase';
import { groupBy, secondsToTime, uuid } from '~/helpers/utils';
import { useAuth } from '~/hooks/useAuth';
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
  const [cyclesByDate, setCyclesByDate] = React.useState<CycleByDate[]>([]);

  const [cyclesState, dispatch] = React.useReducer(
    CyclesReducer,
    initialCyclesState,
  );

  const { user } = useAuth();

  const { newCycle, activeJob, updateJob, jobs, updateActiveJob } =
    useJobsContext();

  const { cyclesByUser, activeCycleId } = cyclesState;

  const activeCycle = React.useMemo(() => {
    return cyclesByUser.find((cycle) => cycle.id === activeCycleId);
  }, [activeCycleId, cyclesByUser]);

  const [amountSecondsPassed, setAmountSecondsPassed] = React.useState(() => {
    if (activeCycle?.startDate) {
      return differenceInSeconds(new Date(), new Date(activeCycle?.startDate));
    }

    return 0;
  });

  const totalCyclesHours = React.useMemo(() => {
    return cyclesByDate?.reduce((acc: number, cycle: CycleByDate) => {
      acc += cycle?.totalCycleInSeconds;

      return acc;
    }, 0);
  }, [cyclesByDate]);

  const activeCycleTotalHours = React.useMemo(() => {
    return cyclesByUser
      .filter((cycle) => {
        return cycle?.jobId === activeCycle?.jobId;
      })
      .reduce((accumulator: number, currentValue: Cycle) => {
        const totalCycleInSeconds = currentValue?.fineshedDate
          ? differenceInSeconds(
              new Date(currentValue.fineshedDate),
              new Date(currentValue.startDate),
            )
          : 0;

        accumulator += totalCycleInSeconds;

        return accumulator;
      }, 0);
  }, [activeCycle, cyclesByUser]);

  const activeCycleTotalSeconds = React.useMemo(() => {
    return activeJob ? activeJob?.totalSecondsRemaining : 0;
  }, [activeJob]);

  const activeCycleInfo: ActiveCycleInfo | null = React.useMemo(() => {
    if (!activeCycle) return null;

    const job = jobs?.find((item) => item.id === activeCycle?.jobId);

    const totalSecondsRemaining = job?.totalSecondsRemaining ?? 0;
    const totalSecondsAmount = job?.totalSecondsAmount ?? 0;

    const percentage = Math.round(
      (totalSecondsRemaining / totalSecondsAmount) * 100,
    );

    return {
      cycleId: activeCycle?.id ?? '',
      jobId: job?.id ?? '',
      title: job?.title ?? '',
      countdown: countdownTextActiveCycle,
      highlight: percentage <= 0,
    };
  }, [activeCycle, jobs, countdownTextActiveCycle]);

  const activeCycleCurrentSeconds =
    activeCycleTotalSeconds - amountSecondsPassed;

  const countdownValue = React.useCallback(() => {
    const amountSeconds =
      activeCycle && activeCycle.jobId !== activeJob?.id
        ? totalCyclesHours
        : totalCyclesHours + amountSecondsPassed;

    const currentSeconds =
      activeCycle && activeCycle.jobId !== activeJob?.id
        ? activeCycleTotalSeconds
        : activeCycleCurrentSeconds;

    const totalCount =
      activeCycleCurrentSeconds >= 1 ? currentSeconds : amountSeconds;

    const { formattedTime } = secondsToTime(totalCount);

    setCountdownText(formattedTime);
  }, [
    activeCycleCurrentSeconds,
    totalCyclesHours,
    activeCycleTotalSeconds,
    amountSecondsPassed,
    activeCycle,
    activeJob,
  ]);

  React.useEffect(() => {
    const job = jobs?.find((item) => item.id === activeCycle?.jobId);

    const totalSecondsRemaining = job?.totalSecondsRemaining ?? 0;

    const jobCurrentSeconds = totalSecondsRemaining - amountSecondsPassed;

    const totalCount =
      jobCurrentSeconds >= 1
        ? jobCurrentSeconds
        : activeCycleTotalHours + amountSecondsPassed;

    const { formattedTime } = secondsToTime(totalCount);

    setCountdownTextActiveCycle(formattedTime);
  }, [jobs, activeCycle, amountSecondsPassed, activeCycleTotalHours]);

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

    return set(ref(db, `cycles/${cycle.id}`), {
      ...cycle,
      isActive: false,
      fineshedDate: serverTimestamp() as FirestoreTimestamp,
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

  const setSecondsPassed = React.useCallback((seconds: number) => {
    setAmountSecondsPassed(seconds);
  }, []);

  const filteredCyclesByJob = React.useMemo(() => {
    return cyclesByUser
      .filter((cycle) => {
        return cycle?.jobId === activeJob?.id;
      })
      .reduce((accumulator: FilteredCycle[], currentValue: Cycle) => {
        const fineshedDate = currentValue?.fineshedDate
          ? format(new Date(currentValue.fineshedDate), "kk':'mm")
          : '';

        const totalCycleInSeconds = currentValue?.fineshedDate
          ? differenceInSeconds(
              new Date(currentValue.fineshedDate),
              new Date(currentValue.startDate),
            )
          : 0;

        const { hours, minutes, seconds } = secondsToTime(totalCycleInSeconds);

        const totalCycle = `${hours}h:${minutes}m:${seconds}s`;

        const cycle: FilteredCycle = {
          id: currentValue.id,
          date: format(new Date(currentValue.startDate), 'dd/MM/yyyy'),
          startDate: format(new Date(currentValue.startDate), "kk':'mm"),
          fineshedDate,
          totalCycle,
          totalCycleInSeconds,
          isActive: currentValue?.fineshedDate ? false : true,
        };

        accumulator.push(cycle);

        return accumulator;
      }, []);
  }, [cyclesByUser, activeJob]);

  const formatCyclesByDate = React.useCallback((groupByDate: GroupByDate) => {
    const data: CycleByDate[] = Object.keys(groupByDate)?.map((key: string) => {
      const totalCyleDate = groupByDate[key]?.reduce(
        (acc: number, cycle: FilteredCycle) => {
          acc += cycle?.totalCycleInSeconds;
          return acc;
        },
        0,
      );

      const { hours, minutes } = secondsToTime(totalCyleDate);

      return {
        id: uuid(),
        date: groupByDate[key][0]?.date,
        totalHoursByDate: `${hours}h:${minutes}m`,
        totalCycleInSeconds: totalCyleDate,
        cycles: groupByDate[key]?.map((cycle) => {
          return {
            id: uuid(),
            startDate: cycle?.startDate,
            fineshedDate: cycle?.fineshedDate,
            totalCycle: cycle?.totalCycle,
            isActive: cycle?.isActive,
          };
        }),
      };
    });

    return { cycles: data };
  }, []);

  // Start Countdow
  React.useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(Number(activeCycle?.startDate)),
        );

        setSecondsPassed(secondsDifference);
      }, 1000);
    } else {
      setSecondsPassed(0);
    }

    return () => clearInterval(interval);
  }, [activeCycle, setSecondsPassed, activeCycleTotalSeconds]);

  // Change Countdown Text
  React.useEffect(() => {
    countdownValue();
  }, [countdownValue]);

  // Cycles by Date
  React.useEffect(() => {
    const groupByDate: GroupByDate = groupBy(filteredCyclesByJob, 'date');

    const { cycles } = formatCyclesByDate(groupByDate);

    setCyclesByDate(cycles);
  }, [filteredCyclesByJob, formatCyclesByDate]);

  React.useEffect(() => {
    if (newCycle) {
      dispatch(addNewCycleJobActions(newCycle));
    }
  }, [newCycle]);

  React.useEffect(() => {
    const job = jobs?.find((item) => item?.id === activeCycle?.jobId);

    if (job) {
      updateActiveJob(job);
    }
  }, [jobs, activeCycle, updateActiveJob]);

  React.useEffect(() => {
    createInitialState();
  }, [createInitialState]);

  const values = React.useMemo(
    () => ({
      cyclesByUser,
      createNewCycleJob,
      finishCurrentCycle,
      activeCycle,
      activeCycleId,
      amountSecondsPassed,
      setSecondsPassed,
      activeCycleTotalSeconds,
      activeCycleCurrentSeconds,
      filteredCyclesByJob,
      formatCyclesByDate,
      totalCyclesHours,
      cyclesByDate,
      countdownText,
      activeCycleInfo,
    }),
    [
      cyclesByUser,
      createNewCycleJob,
      finishCurrentCycle,
      activeCycle,
      activeCycleId,
      amountSecondsPassed,
      setSecondsPassed,
      activeCycleTotalSeconds,
      activeCycleCurrentSeconds,
      filteredCyclesByJob,
      formatCyclesByDate,
      totalCyclesHours,
      cyclesByDate,
      countdownText,
      activeCycleInfo,
    ],
  );

  return (
    <CyclesContext.Provider value={values}>{children}</CyclesContext.Provider>
  );
};
