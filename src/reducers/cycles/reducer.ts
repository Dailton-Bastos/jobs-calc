import { produce } from 'immer';

import type { CyclesState } from '~/@types/cycles';

import { Action, ActionTypes } from './actions';

export const initialCyclesState: CyclesState = {
  cycles: [],
};

export const CyclesReducer = (state: CyclesState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.ADD_NEW_CYCLE_JOB: {
      return produce(state, (draft) => {
        draft.cycles.push(payload.newCycle);
      });
    }

    default:
      return state;
  }
};
