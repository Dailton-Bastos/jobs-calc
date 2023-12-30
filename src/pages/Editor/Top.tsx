import React from 'react';
import { LiaUndoAltSolid } from 'react-icons/lia';

import { IconButton, Tooltip, HStack, Spinner } from '@chakra-ui/react';

import { CopyToClipboard } from '~/components/CopyToClipboard';
import { useEditorContext } from '~/hooks/useEditorContext';

export const Top = () => {
  const { data, isSaving, isLoading, handleResetEditorValue } =
    useEditorContext();

  if (isLoading) return <></>;

  return (
    <HStack justifyContent="flex-end" pb="4" spacing="2" h="10">
      {isSaving ? (
        <Spinner size="sm" color="#DD6B20" />
      ) : (
        <React.Fragment>
          <Tooltip label="Resetar" aria-label="Resetar">
            <IconButton
              variant="unstyled"
              aria-label="Copy"
              display="flex"
              alignItems="center"
              justifyContent="center"
              icon={<LiaUndoAltSolid size={24} />}
              onClick={handleResetEditorValue}
            />
          </Tooltip>

          <CopyToClipboard text={data?.html} isPlainText={false} />
        </React.Fragment>
      )}
    </HStack>
  );
};
