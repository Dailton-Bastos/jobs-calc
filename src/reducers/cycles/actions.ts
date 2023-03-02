import { Cycle } from '~/@types/cycles';

export enum ActionTypes {
  ADD_NEW_CYCLE_JOB = 'ADD_NEW_CYCLE_JOB',
  CREATE_INITIAL_STATE = 'CREATE_INITIAL_STATE',
}

export type Action =
  | {
      type: ActionTypes.ADD_NEW_CYCLE_JOB;
      payload: {
        newCycle: Cycle;
      };
    }
  | {
      type: ActionTypes.CREATE_INITIAL_STATE;
      payload: {
        cycles: Cycle[];
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

export const createInitialStateActions = (cycles: Cycle[]) => {
  return {
    type: ActionTypes.CREATE_INITIAL_STATE as const,
    payload: { cycles },
  };
};
