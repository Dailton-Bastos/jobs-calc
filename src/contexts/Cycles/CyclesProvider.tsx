import React from 'react';

import {
  ref,
  push,
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
import { addNewCycleJobActions } from '~/reducers/cycles/actions';
import { CyclesReducer, initialCyclesState } from '~/reducers/cycles/reducer';

import { CyclesContext } from './CyclesContext';

export const CyclesProvider = ({ children }: CyclesProviderProps) => {
  const [cyclesState, dispatch] = React.useReducer(
    CyclesReducer,
    initialCyclesState,
  );

  const { cycles } = cyclesState;
  const { user } = useAuth();

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

  const values = React.useMemo(
    () => ({
      cycles,
      createNewCycleJob,
    }),
    [cycles, createNewCycleJob],
  );

  return (
    <CyclesContext.Provider value={values}>{children}</CyclesContext.Provider>
  );
};
