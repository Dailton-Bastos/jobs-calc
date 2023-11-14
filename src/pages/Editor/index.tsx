import React from 'react';

import { Box, Container, Spinner } from '@chakra-ui/react';

import { Head } from '~/components/Head';
import { EditorProvider } from '~/contexts/Editor/EditorProvider';

import { Top } from './Top';

const MarkdownEditor = React.lazy(() => import('./MarkdownEditor'));

export const Editor = () => {
  return (
    <>
      <Head title="Editor" />

      <Container maxW="1320px" centerContent px="0">
        <EditorProvider>
          <Box w="100%" pt="6">
            <Top />

            <React.Suspense
              fallback={<Spinner size="md" colorScheme="orange" />}
            >
              <MarkdownEditor />
            </React.Suspense>
          </Box>
        </EditorProvider>
      </Container>
    </>
  );
};
