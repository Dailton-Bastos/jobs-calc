import { Job, IJob } from '~/@types/job';

export enum ActionTypes {
  ADD_NEW_JOB = 'ADD_NEW_JOB',
  CREATE_INITIAL_STATE = 'CREATE_INITIAL_STATE',
  SET_ACTIVE_JOB = 'SET_ACTIVE_JOB',
  UPDATE_JOB = 'UPDATE_JOB',
  DELETE_JOB = 'DELETE_JOB',
}

export type Action =
  | {
      type: ActionTypes.CREATE_INITIAL_STATE;
      payload: {
        data: IJob[];
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
    }
  | {
      type: ActionTypes.UPDATE_JOB;
      payload: {
        job: Job;
      };
    }
  | {
      type: ActionTypes.DELETE_JOB;
      payload: {
        id: string;
      };
    };

export const createInitialStateActions = (data: IJob[], jobs: Job[]) => {
  return {
    type: ActionTypes.CREATE_INITIAL_STATE as const,
    payload: {
      data,
      jobs,
    },
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

export const updateJobActions = (job: Job) => {
  return {
    type: ActionTypes.UPDATE_JOB as const,
    payload: { job },
  };
};

export const deleteJobActions = (id: string) => {
  return {
    type: ActionTypes.DELETE_JOB as const,
    payload: { id },
  };
};
