import React from 'react';
import { AiOutlineQuestionCircle } from 'react-icons/ai';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  IconButton,
  Portal,
  Box,
} from '@chakra-ui/react';

import { CopyToClipboard } from '~/components/CopyToClipboard';

type Props = {
  description: string;
};

export const Description = ({ description }: Props) => {
  return (
    <Popover isLazy trigger="hover" gutter={4} placement="bottom">
      <PopoverTrigger>
        <IconButton
          variant="unstyled"
          aria-label="Observação"
          display="flex"
          alignItems="center"
          justifyContent="center"
          icon={<AiOutlineQuestionCircle size={24} />}
          size="xs"
        />
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />

          <Box position="absolute" right="2" top="2">
            <CopyToClipboard text={description} isPlainText />
          </Box>

          <PopoverBody pt="8">{description}</PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};
