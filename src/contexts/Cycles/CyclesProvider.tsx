import React from 'react';

import { ref, push, ThenableReference } from 'firebase/database';

import {
  CreateNewCycleJobData,
  Cycle,
  CyclesProviderProps,
} from '~/@types/cycles';
import { db } from '~/config/firebase';
import { addNewCycleJobActions } from '~/reducers/cycles/actions';
import { CyclesReducer, initialCyclesState } from '~/reducers/cycles/reducer';

import { CyclesContext } from './CyclesContext';

export const CyclesProvider = ({ children }: CyclesProviderProps) => {
  const [cyclesState, dispatch] = React.useReducer(
    CyclesReducer,
    initialCyclesState,
  );

  const { cycles } = cyclesState;

  const createNewCycleJob = React.useCallback((data: CreateNewCycleJobData) => {
    const newCycle: Cycle = { id: null, ...data };

    const reference: ThenableReference = push(ref(db, 'cycles'), newCycle);

    if (reference.key) {
      dispatch(addNewCycleJobActions(newCycle));
    }
  }, []);

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
