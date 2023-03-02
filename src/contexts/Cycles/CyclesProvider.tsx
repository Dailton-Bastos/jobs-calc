import React from 'react';

import {
  ref,
  push,
  child,
  get,
  query,
  orderByChild,
  equalTo,
  ThenableReference,
  serverTimestamp,
} from 'firebase/database';
import { Timestamp } from 'firebase/firestore';

import {
  CreateNewCycleJobData,
  Cycle,
  CyclesProviderProps,
} from '~/@types/cycles';
import { db } from '~/config/firebase';
import { useAuth } from '~/hooks/useAuth';
import { useJobsContext } from '~/hooks/useJobsContext';
import {
  addNewCycleJobActions,
  createInitialStateActions,
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

  const { cycle } = useJobsContext();

  const createNewCycleJob = React.useCallback(
    (data: CreateNewCycleJobData) => {
      if (!user) return;

      const newCycle: Cycle = {
        id: null,
        jobId: data.jobId,
        userId: user.uid,
        isActive: true,
        startDate: serverTimestamp() as Timestamp,
      };

      const { key }: ThenableReference = push(ref(db, 'cycles'), newCycle);

      if (!key) return;

      dispatch(
        addNewCycleJobActions({
          ...newCycle,
          id: key,
          startDate: new Date().getTime(),
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

  const values = React.useMemo(
    () => ({
      cycles,
      createNewCycleJob,
    }),
    [cycles, createNewCycleJob],
  );

  React.useEffect(() => {
    if (cycle) {
      dispatch(addNewCycleJobActions(cycle));
    }
  }, [cycle]);

  React.useEffect(() => {
    createInitialState();
  }, [createInitialState]);

  return (
    <CyclesContext.Provider value={values}>{children}</CyclesContext.Provider>
  );
};
