import { Cycle, CycleApiData } from '~/@types/cycles';

export enum ActionTypes {
  CREATE_INITIAL_STATE = 'CREATE_INITIAL_STATE',
  ADD_NEW_CYCLE_JOB = 'ADD_NEW_CYCLE_JOB',
  FINISH_CURRENT_CYCLE = 'FINISH_CURRENT_CYCLE',
  DELETE_CYCLE = 'DELETE_CYCLE',
}

// interface InitialStateData {
//   cyclesData: CycleApiData[];
//   cyclesByUser: Cycle[];
//   activeCycle: Cycle | undefined;
// }

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
      type: ActionTypes.DELETE_CYCLE;
      payload: {
        id: string;
      };
    }
  | {
      type: ActionTypes.CREATE_INITIAL_STATE;
      payload: { cycles: CycleApiData[] };
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

export const deleteCycleActions = (id: string) => {
  return {
    type: ActionTypes.DELETE_CYCLE as const,
    payload: { id },
  };
};

export const createInitialStateActions = (cycles: CycleApiData[]) => {
  return {
    type: ActionTypes.CREATE_INITIAL_STATE as const,
    payload: { cycles },
  };
};
