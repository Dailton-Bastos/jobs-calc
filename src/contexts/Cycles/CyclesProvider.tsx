import React from 'react';

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

  const { cycles } = cyclesState;
  const { user } = useAuth();
  const userId = user?.uid;

  const { newCycle, activeJob, updateJob } = useJobsContext();

  const activeCycle = React.useMemo(() => {
    return cycles.find((cycle) => {
      return cycle.isActive && cycle.jobId === activeJob?.id;
    });
  }, [activeJob, cycles]);

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
    },
    [user],
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

    dispatch(createInitialStateActions(cyclesList));
  }, [userId]);

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

  const values = React.useMemo(
    () => ({
      cycles,
      createNewCycleJob,
      finishCurrentCycle,
      activeCycle,
    }),
    [cycles, createNewCycleJob, finishCurrentCycle, activeCycle],
  );

  React.useEffect(() => {
    if (newCycle) {
      dispatch(addNewCycleJobActions(newCycle));
    }
  }, [newCycle]);

  React.useEffect(() => {
    createInitialState();
  }, [createInitialState]);

  return (
    <CyclesContext.Provider value={values}>{children}</CyclesContext.Provider>
  );
};
