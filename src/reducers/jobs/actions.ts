import { Job } from '~/@types/job';

export enum ActionTypes {
  ADD_NEW_JOB = 'ADD_NEW_JOB',
  CREATE_INITIAL_STATE = 'CREATE_INITIAL_STATE',
  SET_ACTIVE_JOB = 'SET_ACTIVE_JOB',
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
      type: ActionTypes.SET_ACTIVE_JOB;
      payload: {
        activeJob: Job | null;
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

export const setActiveJobActions = (job: Job | null) => {
  return {
    type: ActionTypes.SET_ACTIVE_JOB as const,
    payload: {
      activeJob: job,
    },
  };
};
