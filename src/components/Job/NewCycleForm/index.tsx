import React from 'react';
import { RiPauseMiniFill, RiPlayMiniLine } from 'react-icons/ri';

import { Box, Flex, IconButton } from '@chakra-ui/react';

import { Job } from '~/@types/job';
import { useJobsContext } from '~/hooks/useJobsContext';

interface Props {
  job: Job;
}

export const NewCycleForm = ({ job }: Props) => {
  const { createNewCycleJob, activeCycle } = useJobsContext();

  // const jobId = job?.id;

  const handleCreateNewCycleJob = React.useCallback(() => {
    createNewCycleJob(job);
  }, [createNewCycleJob, job]);

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
