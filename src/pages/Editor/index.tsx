import { Box, Container } from '@chakra-ui/react';

import { Head } from '~/components/Head';
import { EditorProvider } from '~/contexts/Editor/EditorProvider';

import { MarkdownEditor } from './MarkdownEditor';
import { Top } from './Top';

export const Editor = () => {
  return (
    <>
      <Head title="Editor" />

      <Container maxW="1320px" centerContent px="0">
        <EditorProvider>
          <Box w="100%" pt="6">
            <Top />

            <MarkdownEditor />
          </Box>
        </EditorProvider>
      </Container>
    </>
  );
};
