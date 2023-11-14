import React from 'react';

import MarkdownIt from 'markdown-it';

import { editorMockup } from '~/helpers/utils';
import {
  // initialStateAction,
  startChangeAction,
  finishChangeAction,
} from '~/reducers/editor/actions';
import { editorReducer } from '~/reducers/editor/reducer';

import { EditorContext } from './EditorContext';

const mdParser = new MarkdownIt();

type Props = {
  children: JSX.Element;
};

export const EditorProvider = ({ children }: Props) => {
  const [state, dispatch] = React.useReducer(editorReducer, {
    isLoading: false,
    isSaving: false,
    data: {
      html: mdParser.render(editorMockup),
      text: editorMockup,
    },
  });

  const debounceRef = React.useRef<NodeJS.Timeout>();

  const handleEditorChange = React.useCallback(
    (data: { html: string; text: string }) => {
      dispatch(startChangeAction(data));

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(async () => {
        // TO DO await ...

        dispatch(finishChangeAction());
      }, 1000);
    },
    [],
  );

  const handleResetEditorValue = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();

      if (window.confirm('Tem certeza que deseja resetar o conteúdo?')) {
        dispatch(
          startChangeAction({
            html: mdParser.render(editorMockup),
            text: editorMockup,
          }),
        );

        // TO DO await ...

        dispatch(finishChangeAction());
      }
    },
    [],
  );

  const value = React.useMemo(
    () => ({
      ...state,
      handleEditorChange,
      handleResetEditorValue,
    }),
    [state, handleEditorChange, handleResetEditorValue],
  );

  return (
    <EditorContext.Provider value={{ ...value }}>
      {children}
    </EditorContext.Provider>
  );
};
