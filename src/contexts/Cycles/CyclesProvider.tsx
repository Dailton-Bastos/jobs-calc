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
} from '~/@types/cycles';
import { db } from '~/config/firebase';
import { secondsToTime, uuid } from '~/helpers/utils';
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
  const [cyclesState, dispatch] = React.useReducer(
    CyclesReducer,
    initialCyclesState,
  );

  const { cycles, activeCycleId } = cyclesState;

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const [amountSecondsPassed, setAmountSecondsPassed] = React.useState(() => {
    if (activeCycle?.startDate) {
      return differenceInSeconds(new Date(), new Date(activeCycle?.startDate));
    }

    return 0;
  });

  const { user } = useAuth();

  const { newCycle, activeJob, updateJob } = useJobsContext();

  const activeCycleTotalSeconds = React.useMemo(() => {
    return activeJob ? activeJob?.totalSecondsRemaining : 0;
  }, [activeJob]);

  const activeCycleCurrentSeconds =
    activeCycleTotalSeconds - amountSecondsPassed;

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

      dispatch(
        addNewCycleJobActions({
          ...cycle,
          id: key,
          startDate: dateInTimestamp,
        }),
      );

      if (activeJob) {
        updateJob(activeJob);
      }
    },
    [user, activeJob, updateJob],
  );

  const createInitialState = React.useCallback(async () => {
    if (!activeJob) return;

    const snapshot = await get(
      query(
        child(ref(db), 'cycles'),
        orderByChild('jobId'),
        equalTo(activeJob.id),
      ),
    );

    const cyclesList: Cycle[] = [];

    if (snapshot && snapshot.exists()) {
      const data = snapshot.val();

      for (const property in data) {
        cyclesList.push(data[property]);
      }
    }

    const currentActiveCycle = cyclesList.find((cycle) => {
      return cycle.isActive && cycle.jobId === activeJob?.id;
    });

    const initialStateData = {
      cycles: cyclesList,
      activeCycle: currentActiveCycle,
    };

    dispatch(createInitialStateActions(initialStateData));
  }, [activeJob]);

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

  const filteredCycles = React.useMemo(() => {
    return cycles.reduce(
      (accumulator: FilteredCycle[], currentValue: Cycle) => {
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
      },
      [],
    );
  }, [cycles]);

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

  React.useEffect(() => {
    if (newCycle) {
      dispatch(addNewCycleJobActions(newCycle));
    }
  }, [newCycle]);

  React.useEffect(() => {
    createInitialState();
  }, [createInitialState]);

  const values = React.useMemo(
    () => ({
      cycles,
      createNewCycleJob,
      finishCurrentCycle,
      activeCycle,
      activeCycleId,
      amountSecondsPassed,
      setSecondsPassed,
      activeCycleTotalSeconds,
      activeCycleCurrentSeconds,
      filteredCycles,
      formatCyclesByDate,
    }),
    [
      cycles,
      createNewCycleJob,
      finishCurrentCycle,
      activeCycle,
      activeCycleId,
      amountSecondsPassed,
      setSecondsPassed,
      activeCycleTotalSeconds,
      activeCycleCurrentSeconds,
      filteredCycles,
      formatCyclesByDate,
    ],
  );

  return (
    <CyclesContext.Provider value={values}>{children}</CyclesContext.Provider>
  );
};
