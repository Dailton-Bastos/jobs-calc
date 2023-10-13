import { JobFormatted } from '~/@types/job';

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
        jobs: JobFormatted[];
      };
    }
  | {
      type: ActionTypes.ADD_NEW_JOB;
      payload: {
        data: JobFormatted;
      };
    }
  | {
      type: ActionTypes.SET_ACTIVE_JOB;
      payload: {
        activeJob: JobFormatted | null;
      };
    }
  | {
      type: ActionTypes.UPDATE_JOB;
      payload: {
        job: JobFormatted;
      };
    }
  | {
      type: ActionTypes.DELETE_JOB;
      payload: {
        id: string;
      };
    };

export const createInitialStateActions = (jobs: JobFormatted[]) => {
  return {
    type: ActionTypes.CREATE_INITIAL_STATE as const,
    payload: {
      jobs,
    },
  };
};

export const addNewJobActions = (data: JobFormatted) => {
  return {
    type: ActionTypes.ADD_NEW_JOB as const,
    payload: { data },
  };
};

export const setActiveJobActions = (job: JobFormatted | null) => {
  return {
    type: ActionTypes.SET_ACTIVE_JOB as const,
    payload: {
      activeJob: job,
    },
  };
};

export const updateJobActions = (job: JobFormatted) => {
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
