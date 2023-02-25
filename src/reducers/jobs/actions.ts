import { Job } from '~/@types/job';

export enum ActionTypes {
  ADD_NEW_JOB = 'ADD_NEW_JOB',
}

export const addNewJobActions = (newJob: Job) => {
  return {
    type: ActionTypes.ADD_NEW_JOB,
    payload: { newJob },
  };
};
