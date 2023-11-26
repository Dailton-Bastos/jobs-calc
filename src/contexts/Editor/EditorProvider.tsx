import React from 'react';

import {
  ref,
  set,
  get,
  query,
  child,
  orderByChild,
  equalTo,
} from 'firebase/database';
import MarkdownIt from 'markdown-it';

import { db } from '~/config/firebase';
import { editorMockup } from '~/helpers/utils';
import { useAuth } from '~/hooks/useAuth';
import {
  initialStateAction,
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
      html: '',
      text: '',
    },
  });

  const debounceRef = React.useRef<NodeJS.Timeout>();

  const { user } = useAuth();

  const userId = user?.uid;

  const saveEditorValueOnDb = React.useCallback(
    async (value: string) => {
      if (!userId) return;

      try {
        await set(ref(db, `notes/${userId}`), { userId, value });
      } catch (error) {
        dispatch(finishChangeAction());

        throw new Error('Error to save note');
      }
    },
    [userId],
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

  const getUserNote = React.useCallback(async () => {
    if (!userId) return;

    dispatch(
      initialStateAction({
        isLoading: true,
        data: {
          html: mdParser.render(editorMockup),
          text: editorMockup,
        },
      }),
    );

    try {
      const snapshot = await get(
        query(child(ref(db), 'notes'), orderByChild('userId'), equalTo(userId)),
      );

      if (snapshot && snapshot.exists()) {
        const { value } = Object.values<{ value: string }>(snapshot.val())[0];

        const data = {
          isLoading: false,
          data: { html: mdParser.render(value), text: value },
        };

        dispatch(initialStateAction(data));

        return;
      }

      dispatch(
        initialStateAction({
          isLoading: false,
          data: {
            html: mdParser.render(editorMockup),
            text: editorMockup,
          },
        }),
      );
    } catch (error) {
      dispatch(
        initialStateAction({
          isLoading: false,
          data: {
            html: mdParser.render(editorMockup),
            text: editorMockup,
          },
        }),
      );

      throw new Error('Error to get user note');
    }
  }, [userId]);

  React.useEffect(() => {
    getUserNote();
  }, [getUserNote]);

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
