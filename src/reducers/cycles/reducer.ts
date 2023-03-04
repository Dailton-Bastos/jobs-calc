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

    case ActionTypes.FINISH_CURRENT_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.isActive && cycle.id === payload.cycle.id;
      });

      if (currentCycleIndex < 0) return state;

      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].fineshedDate = new Date().getTime();
        draft.cycles[currentCycleIndex].isActive = false;
      });
    }

    case ActionTypes.CREATE_INITIAL_STATE:
      return produce(state, (draft) => {
        draft.cycles = payload.cycles;
      });

    default:
      return state;
  }
};
