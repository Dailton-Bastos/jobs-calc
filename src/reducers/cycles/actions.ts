import { Cycle } from '~/@types/cycles';

export enum ActionTypes {
  ADD_NEW_CYCLE_JOB = 'ADD_NEW_CYCLE_JOB',
  CREATE_INITIAL_STATE = 'CREATE_INITIAL_STATE',
  FINISH_CURRENT_CYCLE = 'FINISH_CURRENT_CYCLE',
}

export type Action =
  | {
      type: ActionTypes.ADD_NEW_CYCLE_JOB;
      payload: {
        newCycle: Cycle;
      };
    }
  | {
      type: ActionTypes.FINISH_CURRENT_CYCLE;
      payload: {
        cycle: Cycle;
      };
    }
  | {
      type: ActionTypes.CREATE_INITIAL_STATE;
      payload: {
        cycles: Cycle[];
        activeCycle: Cycle | null;
      };
    };

export const addNewCycleJobActions = (newCycle: Cycle) => {
  return {
    type: ActionTypes.ADD_NEW_CYCLE_JOB as const,
    payload: {
      newCycle,
    },
  };
};

export const finishCurrentCycleActions = (cycle: Cycle) => {
  return {
    type: ActionTypes.FINISH_CURRENT_CYCLE as const,
    payload: { cycle },
  };
};

export const createInitialStateActions = (
  cycles: Cycle[],
  activeCycle: Cycle | null,
) => {
  return {
    type: ActionTypes.CREATE_INITIAL_STATE as const,
    payload: {
      cycles,
      activeCycle,
    },
  };
};
