import { produce } from 'immer';

import type { Cycle, CycleApiData } from '~/@types/cycles';

import { Action, ActionTypes } from './actions';

interface CyclesState {
  cyclesData: CycleApiData[];
  cyclesByUser: Cycle[];
  activeCycleId: string | null;
}

export const initialCyclesState: CyclesState = {
  cyclesData: [],
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

    case ActionTypes.DELETE_CYCLE: {
      return produce(state, (draft) => {
        const index = draft.cyclesByUser?.findIndex(
          (cycle) => cycle?.id === payload?.id,
        );

        if (index !== -1) draft.cyclesByUser.splice(index, 1);
      });
    }

    case ActionTypes.CREATE_INITIAL_STATE:
      return produce(state, (draft) => {
        draft.cyclesData = payload.cycles;
        // draft.cyclesByUser = payload.cyclesByUser;
        // draft.activeCycleId = payload.activeCycle?.id ?? null;
      });

    default:
      return state;
  }
};
