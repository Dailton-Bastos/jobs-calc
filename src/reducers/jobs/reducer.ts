import { produce } from 'immer';

// import { CycleApiData } from '~/@types/cycles';
import { JobApiData } from '~/@types/job';

import { JobActions, ActionTypes } from './actions';

interface JobsState {
  jobsData: JobApiData[];
  data: JobApiData[];
  // cyclesData: CycleApiData[];
  // activeJobData: JobApiData | undefined;
}

export const initialJobsState: JobsState = {
  jobsData: [],
  data: [],
  // cyclesData: [],
  // activeJobData: undefined,
};

export const jobsReducer = (
  state: JobsState,
  action: JobActions,
): JobsState => {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.CREATE_INITIAL_STATE:
      return produce(state, (draft) => {
        draft.jobsData = payload.jobs;
        draft.data = payload.data;
        // draft.cyclesData = payload.cycles;
        // draft.activeJobData = payload.activeJob;
      });

    case ActionTypes.ADD_NEW_JOB:
      return produce(state, (draft) => {
        draft.jobsData.unshift(payload.job);
        // draft.activeJobData = payload.job;
      });

    case ActionTypes.SET_ACTIVE_JOB:
      return produce(state, (draft) => {
        return draft;
        // draft.activeJobData = payload.activeJob;
      });

    case ActionTypes.UPDATE_JOB: {
      const currentJobIndex = state.jobsData.findIndex((job) => {
        return job.id === payload.job.id;
      });

      if (currentJobIndex < 0) return state;

      return produce(state, (draft) => {
        draft.jobsData[currentJobIndex] = payload.job;
      });
    }

    case ActionTypes.DELETE_JOB: {
      return produce(state, (draft) => {
        const index = draft.jobsData?.findIndex(
          (job) => job?.id === payload?.id,
        );

        if (index !== -1) draft.jobsData.splice(index, 1);
      });
    }

    case ActionTypes.ORDER_BY: {
      return produce(state, (draft) => {
        // const { data, value } = payload;
        if (
          payload === 'budget' ||
          payload === 'other' ||
          payload === 'development'
        ) {
          draft.jobsData = draft.data.filter((job) => job.type === payload);

          return;
        }

        if (payload === 'all') {
          draft.jobsData = draft.data;

          return;
        }

        draft.jobsData = draft.data.filter((job) => job.status === payload);
      });
    }

    default:
      return state;
  }
};
