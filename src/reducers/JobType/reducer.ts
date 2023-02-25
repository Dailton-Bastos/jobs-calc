import { ActionTypes } from './actions';

interface Action {
  type: ActionTypes;
}

interface JobTypeState {
  isDisableEstimateField: boolean;
  isDisableJobberIdField: boolean;
  isResetEstimateField: boolean;
  isResetJobberIdField: boolean;
}

export const JOB_TYPE_INITIAL_STATE = {
  isDisableEstimateField: false,
  isDisableJobberIdField: false,
  isResetEstimateField: false,
  isResetJobberIdField: false,
};

export const jobTypeReducer = (state: JobTypeState, action: Action) => {
  switch (action.type) {
    case ActionTypes.TYPE_BUDGET:
      return {
        ...state,
        isDisableEstimateField: true,
        isDisableJobberIdField: false,
        isResetEstimateField: true,
      };
    case ActionTypes.TYPE_OTHER:
      return {
        ...state,
        isDisableEstimateField: false,
        isDisableJobberIdField: true,
        isResetEstimateField: true,
      };

    default:
      return {
        isDisableEstimateField: false,
        isDisableJobberIdField: false,
        isResetEstimateField: false,
        isResetJobberIdField: false,
      };
  }
};
