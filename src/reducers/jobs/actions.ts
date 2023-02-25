import { Job } from '~/@types/job';

export enum ActionTypes {
  ADD_NEW_JOB = 'ADD_NEW_JOB',
  CREATE_INITIAL_STATE = 'CREATE_INITIAL_STATE',
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
