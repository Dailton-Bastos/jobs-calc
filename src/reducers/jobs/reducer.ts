import { produce } from 'immer';

import { Job } from '~/@types/job';

import { Action, ActionTypes } from './actions';

interface JobsState {
  jobs: Job[];
}

export const initialJobsState: JobsState = {
  jobs: [],
};

export const jobsReducer = (state: JobsState, action: Action): JobsState => {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.CREATE_INITIAL_STATE:
      return produce(state, (draft) => {
        draft.jobs = payload.jobs;
      });

    case ActionTypes.ADD_NEW_JOB:
      return produce(state, (draft) => {
        draft.jobs.push(payload.newJob);
      });

    default:
      return state;
  }
};
