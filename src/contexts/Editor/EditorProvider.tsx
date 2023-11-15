import React from 'react';

import { ref, set } from 'firebase/database';
import MarkdownIt from 'markdown-it';

import { db } from '~/config/firebase';
import { editorMockup } from '~/helpers/utils';
import { useAuth } from '~/hooks/useAuth';
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

  const { user } = useAuth();

  const saveEditorValueOnDb = React.useCallback(
    async (value: string) => {
      if (!user) return;

      const userId = user.uid;

      try {
        await set(ref(db, `notes/${userId}`), { userId, value });
      } catch (error) {
        dispatch(finishChangeAction());

        throw new Error('Error to save note');
      }
    },
    [user],
  );

  const handleEditorChange = React.useCallback(
    (data: { html: string; text: string }) => {
      const { text } = data;

      dispatch(startChangeAction(data));

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(async () => {
        await saveEditorValueOnDb(text);

        dispatch(finishChangeAction());
      }, 1000);
    },
    [saveEditorValueOnDb],
  );

  const handleResetEditorValue = React.useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();

      if (window.confirm('Tem certeza que deseja resetar o conteúdo?')) {
        dispatch(
          startChangeAction({
            html: mdParser.render(editorMockup),
            text: editorMockup,
          }),
        );

        await saveEditorValueOnDb(editorMockup);

        dispatch(finishChangeAction());
      }
    },
    [saveEditorValueOnDb],
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
