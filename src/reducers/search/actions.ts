import { JobFormatted } from '~/@types/job';

import { ActionTypes } from './reducer';

export const startSearchAction = (value: string) => {
  return {
    type: ActionTypes.START_SEARCH as const,
    payload: value,
  };
};

export const finishSearchAction = (results: JobFormatted[]) => {
  return {
    type: ActionTypes.FINISH_SEARCH as const,
    payload: results,
  };
};

export const selectedSearchAction = (selected: JobFormatted) => {
  return {
    type: ActionTypes.SELECTED_SAVE as const,
    payload: selected,
  };
};

export const cleanQueryAction = () => {
  return {
    type: ActionTypes.CLEAN_QUERY as const,
  };
};
