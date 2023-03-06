import { Cycle } from '~/@types/cycles';

export enum ActionTypes {
  ADD_NEW_CYCLE_JOB = 'ADD_NEW_CYCLE_JOB',
  CREATE_INITIAL_STATE = 'CREATE_INITIAL_STATE',
  FINISH_CURRENT_CYCLE = 'FINISH_CURRENT_CYCLE',
}

interface InitialStateData {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
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
      payload: null;
    }
  | {
      type: ActionTypes.CREATE_INITIAL_STATE;
      payload: InitialStateData;
    };

export const addNewCycleJobActions = (newCycle: Cycle) => {
  return {
    type: ActionTypes.ADD_NEW_CYCLE_JOB as const,
    payload: {
      newCycle,
    },
  };
};

export const finishCurrentCycleActions = () => {
  return {
    type: ActionTypes.FINISH_CURRENT_CYCLE as const,
    payload: null,
  };
};

export const createInitialStateActions = (data: InitialStateData) => {
  return {
    type: ActionTypes.CREATE_INITIAL_STATE as const,
    payload: data,
  };
};
