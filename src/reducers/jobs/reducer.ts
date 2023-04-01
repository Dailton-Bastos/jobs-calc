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

    case ActionTypes.UPDATE_JOB: {
      const currentJobIndex = state.jobs.findIndex((job) => {
        return job.id === payload.job.id;
      });

      if (currentJobIndex < 0) return state;

      return produce(state, (draft) => {
        draft.jobs[currentJobIndex] = payload.job;
      });
    }

    case ActionTypes.DELETE_JOB: {
      return produce(state, (draft) => {
        const index = draft.jobs?.findIndex((job) => job?.id === payload?.id);

        if (index !== -1) draft.jobs.splice(index, 1);
      });
    }

    default:
      return state;
  }
};
