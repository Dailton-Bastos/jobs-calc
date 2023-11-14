import MdEditor, { Plugins } from 'react-markdown-editor-lite';

import { Box } from '@chakra-ui/react';
import MarkdownIt from 'markdown-it';

import 'react-markdown-editor-lite/lib/index.css';
import { useEditorContext } from '~/hooks/useEditorContext';

const mdParser = new MarkdownIt();

MdEditor.use(Plugins.TabInsert, { tabMapValue: 2 });

const MarkdownEditor = () => {
  const { data, handleEditorChange, isLoading } = useEditorContext();

  return (
    <Box boxShadow="md">
      <MdEditor
        renderHTML={(text) => mdParser.render(text)}
        readOnly={isLoading}
        onChange={handleEditorChange}
        value={data?.text}
        canView={{
          menu: true,
          md: true,
          html: true,
          fullScreen: false,
          hideMenu: true,
          both: true,
        }}
        style={{
          height: '42rem',
          opacity: isLoading ? 0.5 : 1,
          pointerEvents: isLoading ? 'none' : 'all',
        }}
      />
    </Box>
  );
};

export default MarkdownEditor;
