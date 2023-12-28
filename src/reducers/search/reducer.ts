import { JobFormatted } from '~/@types/job';

export enum ActionTypes {
  START_SEARCH = 'START_SEARCH',
  FINISH_SEARCH = 'FINISH_SEARCH',
  SELECTED_SAVE = 'SELECTED_SAVE',
  CLEAN_QUERY = 'CLEAN_QUERY',
}

type SearchState = {
  isLoading: boolean;
  results: JobFormatted[];
  selected?: JobFormatted;
  value: string;
};

type SearchAction =
  | {
      type: ActionTypes.START_SEARCH;
      payload: string;
    }
  | {
      type: ActionTypes.FINISH_SEARCH;
      payload: JobFormatted[];
    }
  | {
      type: ActionTypes.SELECTED_SAVE;
      payload: JobFormatted;
    }
  | {
      type: ActionTypes.CLEAN_QUERY;
    };

export const searchReducer = (
  state: SearchState,
  action: SearchAction,
): SearchState => {
  switch (action.type) {
    case ActionTypes.START_SEARCH:
      return {
        ...state,
        isLoading: true,
        value: action.payload,
      };

    case ActionTypes.FINISH_SEARCH:
      return {
        ...state,
        isLoading: false,
        results: action.payload,
      };

    case ActionTypes.SELECTED_SAVE:
      return {
        ...state,
        isLoading: false,
        selected: action.payload,
      };

    case ActionTypes.CLEAN_QUERY:
      return {
        ...state,
        isLoading: false,
        value: '',
        results: [],
      };

    default:
      return state;
  }
};
