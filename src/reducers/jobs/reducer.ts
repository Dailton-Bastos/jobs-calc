import { produce } from 'immer';

import { Job } from '~/@types/job';

import { ActionTypes } from './actions';

interface JobsState {
  jobs: Job[];
}

interface Action {
  type: ActionTypes;
  payload: {
    newJob: Job;
  };
}

export const jobsReducer = (state: JobsState, action: Action) => {
  switch (action.type) {
    case ActionTypes.ADD_NEW_JOB:
      return produce(state, (draft) => {
        draft.jobs.push(action.payload.newJob);
      });

    default:
      return state;
  }
};
