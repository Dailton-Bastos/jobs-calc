import { produce } from 'immer';

import { Job } from '~/@types/job';

import { Action, ActionTypes } from './actions';

interface JobsState {
  jobs: Job[];
  activeJob: Job | null;
}

export const initialJobsState: JobsState = {
  jobs: [],
  activeJob: null,
};

export const jobsReducer = (state: JobsState, action: Action): JobsState => {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.CREATE_INITIAL_STATE:
      return produce(state, (draft) => {
        draft.jobs = payload.jobs;
        draft.activeJob = null;
      });

    case ActionTypes.ADD_NEW_JOB:
      return produce(state, (draft) => {
        draft.jobs.push(payload.newJob);
        draft.activeJob = payload.newJob;
      });

    case ActionTypes.SET_ACTIVE_JOB:
      return produce(state, (draft) => {
        draft.activeJob = payload.activeJob;
      });

    default:
      return state;
  }
};
