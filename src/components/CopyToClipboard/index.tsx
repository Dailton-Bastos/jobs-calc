import React from 'react';
import { AiOutlineCopy } from 'react-icons/ai';

import { IconButton, Tooltip } from '@chakra-ui/react';

import { useCopyToClipboard } from '~/hooks/useCopyToClipboard';

type Props = {
  text: string;
  isPlainText: boolean;
  callBack?: () => void;
};

export const CopyToClipboard = ({
  text,
  isPlainText = true,
  callBack,
}: Props) => {
  const [copyToClipboard, copyResult] = useCopyToClipboard();

  const label =
    copyResult?.state === 'sucess'
      ? 'Copiado'
      : copyResult?.state === 'error'
      ? 'Error'
      : 'Copiar';

  const handleClickCopy = React.useCallback(() => {
    copyToClipboard({ text, isPlainText });

    callBack && callBack();
  }, [copyToClipboard, text, isPlainText, callBack]);

  return (
    <Tooltip label={label} aria-label="Copy" closeOnClick={false}>
      <IconButton
        variant="unstyled"
        aria-label="Copy"
        display="flex"
        alignItems="center"
        justifyContent="center"
        icon={<AiOutlineCopy size={24} />}
        size="xs"
        onClick={handleClickCopy}
      />
    </Tooltip>
  );
};
