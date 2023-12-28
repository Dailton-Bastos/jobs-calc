import React from 'react';

type Data = {
  html: string;
  text: string;
};

type EditorContextData = {
  isLoading: boolean;
  isSaving: boolean;
  data: Data;
  handleEditorChange: (data: Data) => void;
  handleResetEditorValue: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
};

export const EditorContext = React.createContext({} as EditorContextData);
