import { Cycle } from '~/@types/cycles';

export enum ActionTypes {
  ADD_NEW_CYCLE_JOB = 'ADD_NEW_CYCLE_JOB',
}

export type Action = {
  type: ActionTypes.ADD_NEW_CYCLE_JOB;
  payload: {
    newCycle: Cycle;
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
