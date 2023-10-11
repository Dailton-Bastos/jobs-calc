import React from 'react';

import {
  ref,
  child,
  get,
  query,
  orderByChild,
  equalTo,
} from 'firebase/database';

import type { Cycle } from '~/@types/cycles';
import { db } from '~/config/firebase';
import { createInitialStateActions } from '~/reducers/cycles/actions';
import { CyclesReducer, initialCyclesState } from '~/reducers/cycles/reducer';

export const useInitialCyclesState = () => {
  const [state, dispatch] = React.useReducer(CyclesReducer, initialCyclesState);

  const createInitialState = React.useCallback(async (userId: string) => {
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

    const currentActiveCycle = cyclesList?.find((cycle) => cycle.isActive);

    const initialStateData = {
      cyclesByUser: cyclesList,
      activeCycle: currentActiveCycle,
    };

    dispatch(createInitialStateActions(initialStateData));
  }, []);

  return { state, dispatch, createInitialState };
};
