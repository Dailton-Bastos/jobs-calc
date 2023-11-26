import { produce } from 'immer';

import type { CycleApiData } from '~/@types/cycles';

import { CycleActions, ActionTypes } from './actions';

interface CyclesState {
  cyclesData: CycleApiData[];
  activeCycle: CycleApiData | null;
}

export const initialCyclesState: CyclesState = {
  cyclesData: [],
  activeCycle: null,
};

export const CyclesReducer = (state: CyclesState, action: CycleActions) => {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.START_NEW_CYCLE: {
      return produce(state, (draft) => {
        draft.cyclesData.push(payload.cycle);
        draft.activeCycle = payload.cycle;
      });
    }

    case ActionTypes.FINISH_CURRENT_CYCLE: {
      const currentCycleIndex = state.cyclesData.findIndex((cycle) => {
        return cycle.isActive && cycle.id === state.activeCycle?.id;
      });

      if (currentCycleIndex < 0) return state;

      return produce(state, (draft) => {
        draft.cyclesData[currentCycleIndex] = payload.cycle;
        draft.activeCycle = null;
      });
    }

    case ActionTypes.DELETE_CYCLE: {
      return produce(state, (draft) => {
        const index = draft.cyclesData?.findIndex(
          (cycle) => cycle?.id === payload?.id,
        );

        if (index !== -1) draft.cyclesData.splice(index, 1);
      });
    }

    case ActionTypes.CREATE_INITIAL_STATE:
      return produce(state, (draft) => {
        draft.cyclesData = payload.cycles;
        draft.activeCycle = payload.activeCycle;
      });

    default:
      return state;
  }
};
