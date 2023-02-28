import { produce } from 'immer';

import { Job, Cycle } from '~/@types/job';

import { Action, ActionTypes } from './actions';

interface JobsState {
  jobs: Job[];
  currentJobId: string | null;
  cycles: Cycle[];
}

export const initialJobsState: JobsState = {
  jobs: [],
  currentJobId: null,
  cycles: [],
};

export const jobsReducer = (state: JobsState, action: Action): JobsState => {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.CREATE_INITIAL_STATE:
      return produce(state, (draft) => {
        draft.jobs = payload.jobs;
        draft.cycles = payload.cycles;
      });

    case ActionTypes.ADD_NEW_JOB:
      return produce(state, (draft) => {
        draft.jobs.push(payload.newJob);
        draft.currentJobId = payload.newJob.id;
      });

    case ActionTypes.ADD_NEW_CYCLE_JOB:
      return produce(state, (draft) => {
        // draft.jobs.push(payload.newJob);
        // draft.currentJobId = payload.newJob.id;
        draft.cycles.push(payload.newCycle);
      });

    default:
      return state;
  }
};
