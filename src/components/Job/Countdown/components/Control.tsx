import React from 'react';
import { RiPauseMiniFill, RiPlayMiniLine } from 'react-icons/ri';

import { Box, Flex, IconButton } from '@chakra-ui/react';

import { useCyclesContext } from '~/hooks/useCyclesContext';
import { useJobsContext } from '~/hooks/useJobsContext';

export const Control = () => {
  const { createNewCycleJob, finishCurrentCycle, activeCycle } =
    useCyclesContext();
  const { activeJob } = useJobsContext();

  const handleCreateNewCycle = React.useCallback(() => {
    if (activeJob?.id) {
      createNewCycleJob({ jobId: activeJob.id });
    }
  }, [activeJob, createNewCycleJob]);

  const handleFinishCurrentCycle = React.useCallback(() => {
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
            colorScheme="gray"
            size="lg"
            icon={<RiPauseMiniFill size={28} />}
            onClick={handleFinishCurrentCycle}
          />
        ) : (
          <IconButton
            aria-label="Iniciar"
            variant="outline"
            colorScheme="gray"
            size="lg"
            icon={<RiPlayMiniLine size={28} />}
            onClick={handleCreateNewCycle}
          />
        )}
      </Box>
    </Flex>
  );
};
