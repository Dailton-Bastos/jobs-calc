export enum ActionTypes {
  INITIAL_STATE = 'INITIAL_STATE',
  START_CHANGE = 'START_CHANGE',
  FINISH_CHANGE = 'FINISH_CHANGE',
}

type Data = {
  html: string;
  text: string;
};

type EditorState = {
  isLoading: boolean;
  isSaving: boolean;
  data: Data;
};

type EditorAction =
  | {
      type: ActionTypes.INITIAL_STATE;
      payload: { isLoading: boolean; data: Data };
    }
  | {
      type: ActionTypes.START_CHANGE;
      payload: { data: Data };
    }
  | {
      type: ActionTypes.FINISH_CHANGE;
    };

export const editorReducer = (
  state: EditorState,
  action: EditorAction,
): EditorState => {
  switch (action.type) {
    case ActionTypes.INITIAL_STATE:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        isSaving: false,
        data: {
          html: action.payload.data.html,
          text: action.payload.data.text,
        },
      };

    case ActionTypes.START_CHANGE:
      return {
        ...state,
        isSaving: true,
        data: {
          html: action.payload.data.html,
          text: action.payload.data.text,
        },
      };

    case ActionTypes.FINISH_CHANGE:
      return {
        ...state,
        isSaving: false,
        isLoading: false,
      };

    default: {
      return state;
    }
  }
};
