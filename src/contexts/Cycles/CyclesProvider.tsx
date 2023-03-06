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
  serverTimestamp,
} from 'firebase/database';

import type {
  CreateNewCycleJobData,
  Cycle,
  CyclesProviderProps,
  FirestoreTimestamp,
} from '~/@types/cycles';
import { db } from '~/config/firebase';
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
      return differenceInSeconds(
        new Date(),
        new Date(Number(activeCycle?.startDate)),
      );
    }

    return 0;
  });

  const { user } = useAuth();
  const userId = user?.uid;

  const { newCycle, activeJob, updateJob } = useJobsContext();

  const createNewCycleJob = React.useCallback(
    (data: CreateNewCycleJobData) => {
      if (!user) return;

      const dateInServerTimestamp = serverTimestamp() as FirestoreTimestamp;

      const cycle: Cycle = {
        id: null,
        jobId: data.jobId,
        userId: user.uid,
        isActive: true,
        startDate: dateInServerTimestamp,
      };

      const { key }: ThenableReference = push(ref(db, 'cycles'), cycle);

      if (!key) return;

      const dateInTimestamp = new Date().getTime();

      dispatch(
        addNewCycleJobActions({
          ...cycle,
          id: key,
          startDate: dateInTimestamp,
        }),
      );

      if (activeJob) {
        updateJob({
          ...activeJob,
          startDate: new Date().getTime(),
        });
      }
    },
    [user, activeJob, updateJob],
  );

  const createInitialState = React.useCallback(async () => {
    if (!userId) return;

    const snapshot = await get(
      query(child(ref(db), 'cycles'), orderByChild('userId'), equalTo(userId)),
    );

    const cyclesList: Cycle[] = [];

    if (snapshot && snapshot.exists()) {
      const data = snapshot.val();

      for (const property in data) {
        cyclesList.push({ id: property, ...data[property] });
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
  }, [userId, activeJob]);

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

      updateCycle(cycle);

      updateJob({
        ...activeJob,
        startDate: null,
      });

      dispatch(finishCurrentCycleActions(cycle));
    },
    [updateCycle, updateJob, activeJob],
  );

  const setSecondsPassed = React.useCallback((seconds: number) => {
    setAmountSecondsPassed(seconds);
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
    }),
    [
      cycles,
      createNewCycleJob,
      finishCurrentCycle,
      activeCycle,
      activeCycleId,
      amountSecondsPassed,
      setSecondsPassed,
    ],
  );

  return (
    <CyclesContext.Provider value={values}>{children}</CyclesContext.Provider>
  );
};
