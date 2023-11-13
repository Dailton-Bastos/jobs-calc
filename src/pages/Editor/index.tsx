import React from 'react';
import { LiaUndoAltSolid } from 'react-icons/lia';
import MdEditor, { Plugins } from 'react-markdown-editor-lite';

import { Box, Container, IconButton, Tooltip, HStack } from '@chakra-ui/react';
import MarkdownIt from 'markdown-it';

import { CopyToClipboard } from '~/components/CopyToClipboard';
import { Head } from '~/components/Head';

import 'react-markdown-editor-lite/lib/index.css';
import { markdown } from './mockup';

const mdParser = new MarkdownIt();

MdEditor.use(Plugins.TabInsert, { tabMapValue: 2 });

type MdEditorData = {
  html: string;
  text: string;
};

export const Editor = () => {
  const [value, setValue] = React.useState(markdown);
  const [resetTextValue, setResetTextValue] = React.useState(false);

  const [textCopyToClipboard, setTextCopyToClipboard] = React.useState(() => {
    return mdParser.render(value);
  });

  const handleEditorChange = React.useCallback(
    ({ text, html }: MdEditorData) => {
      setTextCopyToClipboard(html);

      setValue(text);

      setResetTextValue(true);
    },
    [],
  );

  const handleResetTextValue = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();

      if (window.confirm('Certeza que deseja resetar o conteúdo?')) {
        setValue(markdown);

        setResetTextValue(false);
      }
    },
    [],
  );

  return (
    <>
      <Head title="Editor" />

      <Container maxW="1320px" centerContent px="0">
        <Box w="100%" pt="6">
          <HStack justifyContent="flex-end" pb="4" spacing="2">
            {resetTextValue && (
              <Tooltip label="Resetar" aria-label="Resetar">
                <IconButton
                  variant="unstyled"
                  aria-label="Copy"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  icon={<LiaUndoAltSolid size={24} color="#333" />}
                  size="xs"
                  onClick={handleResetTextValue}
                />
              </Tooltip>
            )}

            <CopyToClipboard text={textCopyToClipboard} />
          </HStack>

          <Box boxShadow="md">
            <MdEditor
              renderHTML={(text) => mdParser.render(text)}
              onChange={handleEditorChange}
              value={value}
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
        </Box>
      </Container>
    </>
  );
};
