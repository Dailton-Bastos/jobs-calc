import React from 'react';

import { EditorContext } from '~/contexts/Editor/EditorContext';

export const useEditorContext = () => React.useContext(EditorContext);
