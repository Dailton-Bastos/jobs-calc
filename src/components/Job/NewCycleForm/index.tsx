import React from 'react';
import { RiPauseMiniFill, RiPlayMiniLine } from 'react-icons/ri';
import { useParams } from 'react-router-dom';

import { Box, Flex, IconButton } from '@chakra-ui/react';
import { serverTimestamp } from 'firebase/database';

import { Cycle, FirestoreTimestamp } from '~/@types/job';
import { useJobsContext } from '~/hooks/useJobsContext';

export const NewCycleForm = () => {
  const { createNewCycleJob, activeCycle } = useJobsContext();

  const { id } = useParams();

  const handleCreateNewCycleJob = React.useCallback(() => {
    const newCycle: Cycle = {
      id: null,
      jobId: id ?? '',
      startDate: serverTimestamp() as FirestoreTimestamp,
    };

    createNewCycleJob(newCycle);
  }, [createNewCycleJob, id]);

  return (
    <Flex align="center" justify="center">
      <Box mt="6">
        {activeCycle ? (
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
            onClick={handleCreateNewCycleJob}
          />
        )}
      </Box>
    </Flex>
  );
};
