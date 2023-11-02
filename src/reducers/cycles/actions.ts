import { CycleApiData } from '~/@types/cycles';

export enum ActionTypes {
  START_NEW_CYCLE = 'START_NEW_CYCLE',
  CREATE_INITIAL_STATE = 'CREATE_INITIAL_STATE',
  FINISH_CURRENT_CYCLE = 'FINISH_CURRENT_CYCLE',
  DELETE_CYCLE = 'DELETE_CYCLE',
}

export type CycleActions =
  | {
      type: ActionTypes.START_NEW_CYCLE;
      payload: {
        cycle: CycleApiData;
      };
    }
  | {
      type: ActionTypes.FINISH_CURRENT_CYCLE;
      payload: { cycle: CycleApiData };
    }
  | {
      type: ActionTypes.DELETE_CYCLE;
      payload: {
        id: string;
      };
    }
  | {
      type: ActionTypes.CREATE_INITIAL_STATE;
      payload: { cycles: CycleApiData[]; activeCycle: CycleApiData | null };
    };

export const startNewCycleAction = (cycle: CycleApiData) => {
  return {
    type: ActionTypes.START_NEW_CYCLE as const,
    payload: { cycle },
  };
};

export const finishCurrentCycleAction = (cycle: CycleApiData) => {
  return {
    type: ActionTypes.FINISH_CURRENT_CYCLE as const,
    payload: { cycle },
  };
};

export const deleteCycleActions = (id: string) => {
  return {
    type: ActionTypes.DELETE_CYCLE as const,
    payload: { id },
  };
};

export const createInitialStateActions = (
  cycles: CycleApiData[],
  activeCycle: CycleApiData | null,
) => {
  return {
    type: ActionTypes.CREATE_INITIAL_STATE as const,
    payload: { cycles, activeCycle },
  };
};
