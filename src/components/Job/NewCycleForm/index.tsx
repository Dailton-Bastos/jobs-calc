import React from 'react';
import { RiPauseMiniFill, RiPlayMiniLine } from 'react-icons/ri';

import { Box, Flex, IconButton } from '@chakra-ui/react';

import { useCyclesContext } from '~/hooks/useCyclesContext';

export const NewCycleForm = () => {
  const { finishCurrentCycle, activeCycle } = useCyclesContext();

  const handleFInishCurrentCycle = React.useCallback(() => {
    if (activeCycle) {
      finishCurrentCycle(activeCycle);
    }
  }, [finishCurrentCycle, activeCycle]);

  return (
    <Flex align="center" justify="center">
      <Box mt="6">
        {activeCycle ? (
          <IconButton
            aria-label="Parar"
            title="Finalizar"
            variant="outline"
            colorScheme="red"
            size="lg"
            icon={<RiPauseMiniFill size={28} />}
            onClick={handleFInishCurrentCycle}
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
