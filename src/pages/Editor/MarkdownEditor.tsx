import MdEditor, { Plugins } from 'react-markdown-editor-lite';

import { Box, Spinner, Flex } from '@chakra-ui/react';
import hljs from 'highlight.js';
import MarkdownIt from 'markdown-it';

import { useEditorContext } from '~/hooks/useEditorContext';
import 'highlight.js/styles/atom-one-light.css';
import 'react-markdown-editor-lite/lib/index.css';
import './styles.css';

const mdParser = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (e) {
        throw new Error('highlight');
      }
    }
    return '';
  },
});

MdEditor.use(Plugins.TabInsert, { tabMapValue: 2 });

export const MarkdownEditor = () => {
  const { data, handleEditorChange, isLoading } = useEditorContext();

  if (isLoading) {
    return (
      <Flex align="center" justify="center" h="lg">
        <Spinner size="lg" color="orange.500" />
      </Flex>
    );
  }

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
        }}
      />
    </Box>
  );
};
