import { ActionTypes } from './reducer';

export const initialStateAction = (data: {
  isLoading: boolean;
  data: {
    html: string;
    text: string;
  };
}) => {
  return {
    type: ActionTypes.INITIAL_STATE as const,
    payload: data,
  };
};

export const startChangeAction = (data: { html: string; text: string }) => {
  return {
    type: ActionTypes.START_CHANGE as const,
    payload: { data },
  };
};

export const finishChangeAction = () => {
  return {
    type: ActionTypes.FINISH_CHANGE as const,
  };
};
