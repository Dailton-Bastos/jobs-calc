import { produce } from 'immer';

import type { CyclesState } from '~/@types/cycles';

import { Action, ActionTypes } from './actions';

export const initialCyclesState: CyclesState = {
  cyclesByUser: [],
  activeCycleId: null,
};

export const CyclesReducer = (state: CyclesState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.ADD_NEW_CYCLE_JOB: {
      return produce(state, (draft) => {
        draft.cyclesByUser.push(payload.newCycle);
        draft.activeCycleId = payload.newCycle.id;
      });
    }

    case ActionTypes.FINISH_CURRENT_CYCLE: {
      const currentCycleIndex = state.cyclesByUser.findIndex((cycle) => {
        return cycle.isActive && cycle.id === state.activeCycleId;
      });

      if (currentCycleIndex < 0) return state;

      return produce(state, (draft) => {
        draft.cyclesByUser[currentCycleIndex].fineshedDate =
          new Date().getTime();
        draft.cyclesByUser[currentCycleIndex].isActive = false;
        draft.activeCycleId = null;
      });
    }

    case ActionTypes.CREATE_INITIAL_STATE:
      return produce(state, (draft) => {
        draft.cyclesByUser = payload.cyclesByUser;
        draft.activeCycleId = payload.activeCycle?.id ?? null;
      });

    default:
      return state;
  }
};
