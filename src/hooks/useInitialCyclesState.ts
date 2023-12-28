import React from 'react';

import {
  ref,
  child,
  get,
  query,
  orderByChild,
  equalTo,
} from 'firebase/database';

import type { CycleApiData } from '~/@types/cycles';
import { db } from '~/config/firebase';
import { createInitialStateActions } from '~/reducers/cycles/actions';
import { CyclesReducer, initialCyclesState } from '~/reducers/cycles/reducer';

export const useInitialCyclesState = () => {
  const [state, dispatch] = React.useReducer(CyclesReducer, initialCyclesState);

  const snapshotReports = React.useCallback(async (userId: string) => {
    const snapshot = await get(
      query(child(ref(db), 'cycles'), orderByChild('userId'), equalTo(userId)),
    );

    let val: { [key: string]: CycleApiData } = {};

    if (snapshot && snapshot.exists()) {
      val = snapshot.val();
    }

    return { val };
  }, []);

  const createInitialState = React.useCallback(
    async (userId: string) => {
      if (!userId) return;

      const { val } = await snapshotReports(userId);

      const cyclesData: CycleApiData[] = [];

      if (val) {
        for (const property in val) {
          cyclesData.push({ ...val[property], id: property });
        }
      }

      const activeCycle = cyclesData.find((cycle) => cycle.isActive) ?? null;

      dispatch(createInitialStateActions(cyclesData, activeCycle));
    },
    [snapshotReports],
  );

  return { state, dispatch, createInitialState };
};
