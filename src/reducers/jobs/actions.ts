// import { CycleApiData } from '~/@types/cycles';
import { JobApiData } from '~/@types/job';

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
        jobs: JobApiData[];
        // cycles: CycleApiData[];
        // activeJob: JobApiData | undefined;
      };
    }
  | {
      type: ActionTypes.ADD_NEW_JOB;
      payload: {
        job: JobApiData;
      };
    }
  | {
      type: ActionTypes.SET_ACTIVE_JOB;
      payload: {
        activeJob: JobApiData | undefined;
      };
    }
  | {
      type: ActionTypes.UPDATE_JOB;
      payload: {
        job: JobApiData;
      };
    }
  | {
      type: ActionTypes.DELETE_JOB;
      payload: {
        id: string;
      };
    };

export const createInitialStateActions = (
  jobs: JobApiData[],
  // cycles: CycleApiData[],
  // activeJob: JobApiData | undefined,
) => {
  return {
    type: ActionTypes.CREATE_INITIAL_STATE as const,
    payload: {
      jobs,
      // cycles,
      // activeJob,
    },
  };
};

export const addNewJobActions = (job: JobApiData) => {
  return {
    type: ActionTypes.ADD_NEW_JOB as const,
    payload: { job },
  };
};

export const setActiveJobActions = (job: JobApiData | null) => {
  return {
    type: ActionTypes.SET_ACTIVE_JOB as const,
    payload: {
      activeJob: job,
    },
  };
};

export const updateJobActions = (job: JobApiData) => {
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
