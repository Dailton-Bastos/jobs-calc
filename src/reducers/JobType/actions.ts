export enum ActionTypes {
  TYPE_BUDGET = 'TYPE_BUDGET',
  TYPE_OTHER = 'TYPE_OTHER',
  TYPE_DEVELOPMENT = 'TYPE_DEVELOPMENT',
}

export const jobTypeBudgetAction = () => {
  return {
    type: ActionTypes.TYPE_BUDGET,
  };
};

export const jobTypeOtherAction = () => {
  return {
    type: ActionTypes.TYPE_OTHER,
  };
};

export const jobTypeDevelopmentAction = () => {
  return {
    type: ActionTypes.TYPE_DEVELOPMENT,
  };
};
