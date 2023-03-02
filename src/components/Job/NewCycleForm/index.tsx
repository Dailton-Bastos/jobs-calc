import React from 'react';
import { RiPauseMiniFill, RiPlayMiniLine } from 'react-icons/ri';

import { Box, Flex, IconButton } from '@chakra-ui/react';

import { useJobsContext } from '~/hooks/useJobsContext';

export const NewCycleForm = () => {
  const { activeJob } = useJobsContext();

  return (
    <Flex align="center" justify="center">
      <Box mt="6">
        {activeJob?.startDate ? (
          <IconButton
            aria-label="Parar"
            variant="outline"
            colorScheme="red"
            size="lg"
            icon={<RiPauseMiniFill size={28} />}
          />
        ) : (
          <IconButton
            aria-label="Iniciar"
            variant="outline"
            colorScheme="green"
            size="lg"
            icon={<RiPlayMiniLine size={28} />}
          />
        )}
      </Box>
    </Flex>
  );
};
