import { Job, Cycle } from '~/@types/job';

export enum ActionTypes {
  ADD_NEW_JOB = 'ADD_NEW_JOB',
  CREATE_INITIAL_STATE = 'CREATE_INITIAL_STATE',
  ADD_NEW_CYCLE_JOB = 'ADD_NEW_CYCLE_JOB',
}

export type Action =
  | {
      type: ActionTypes.CREATE_INITIAL_STATE;
      payload: {
        jobs: Job[];
      };
    }
  | {
      type: ActionTypes.ADD_NEW_JOB;
      payload: {
        newJob: Job;
      };
    }
  | {
      type: ActionTypes.ADD_NEW_CYCLE_JOB;
      payload: {
        newCycle: Cycle;
      };
    };

export const createInitialStateActions = (jobs: Job[]) => {
  return {
    type: ActionTypes.CREATE_INITIAL_STATE as const,
    payload: { jobs },
  };
};

export const addNewJobActions = (newJob: Job) => {
  return {
    type: ActionTypes.ADD_NEW_JOB as const,
    payload: { newJob },
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
