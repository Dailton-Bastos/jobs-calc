import type { JobApiData, OrderBy } from '~/@types/job';

export enum ActionTypes {
  ADD_NEW_JOB = 'ADD_NEW_JOB',
  CREATE_INITIAL_STATE = 'CREATE_INITIAL_STATE',
  SET_ACTIVE_JOB = 'SET_ACTIVE_JOB',
  UPDATE_JOB = 'UPDATE_JOB',
  DELETE_JOB = 'DELETE_JOB',
  ORDER_BY = 'ORDER_BY',
}

export type JobActions =
  | {
      type: ActionTypes.CREATE_INITIAL_STATE;
      payload: {
        jobs: JobApiData[];
        data: JobApiData[];
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
    }
  | {
      type: ActionTypes.ORDER_BY;
      payload: OrderBy;
    };

export const createInitialStateActions = (
  jobs: JobApiData[],
  data: JobApiData[],
) => {
  return {
    type: ActionTypes.CREATE_INITIAL_STATE as const,
    payload: {
      jobs,
      data,
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

export const orderByJobActions = (value: OrderBy) => {
  return {
    type: ActionTypes.ORDER_BY as const,
    payload: value,
  };
};
