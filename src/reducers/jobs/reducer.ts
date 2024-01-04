import { produce } from 'immer';

import { JobApiData } from '~/@types/job';

import { JobActions, ActionTypes } from './actions';

interface JobsState {
  jobsData: JobApiData[];
  data: JobApiData[];
}

export const initialJobsState: JobsState = {
  jobsData: [],
  data: [],
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
      });

    case ActionTypes.ADD_NEW_JOB:
      return produce(state, (draft) => {
        draft.jobsData.unshift(payload.job);
        draft.data.unshift(payload.job);
      });

    case ActionTypes.SET_ACTIVE_JOB:
      return produce(state, (draft) => {
        return draft;
      });

    case ActionTypes.UPDATE_JOB: {
      const currentJobIndex = state.jobsData.findIndex((job) => {
        return job.id === payload.job.id;
      });
      const currentJobDataIndex = state.data.findIndex((job) => {
        return job.id === payload.job.id;
      });

      if (currentJobIndex < 0 || currentJobDataIndex < 0) return state;

      return produce(state, (draft) => {
        draft.jobsData[currentJobIndex] = payload.job;
        draft.data[currentJobDataIndex] = payload.job;
      });
    }

    case ActionTypes.DELETE_JOB: {
      return produce(state, (draft) => {
        const index = draft.jobsData?.findIndex(
          (job) => job?.id === payload?.id,
        );

        const indexData = draft.data?.findIndex(
          (job) => job?.id === payload?.id,
        );

        if (index !== -1) draft.jobsData.splice(index, 1);
        if (indexData !== -1) draft.data.splice(indexData, 1);
      });
    }

    case ActionTypes.ORDER_BY: {
      return produce(state, (draft) => {
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
