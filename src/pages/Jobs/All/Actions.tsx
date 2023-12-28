import React from 'react';
import {
  RiDeleteBin2Line,
  RiEdit2Line,
  RiPushpinLine,
  RiUnpinLine,
} from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

import {
  HStack,
  Tooltip,
  useDisclosure,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';

import type { JobFormatted } from '~/@types/job';
import { useCyclesContext } from '~/hooks/useCyclesContext';
import { useJobs } from '~/hooks/useJobs';
import { useJobsContext } from '~/hooks/useJobsContext';

import { DeleteJob } from './DeleteJob';

interface Props {
  job: JobFormatted;
}

export const Actions = ({ job }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const id = job?.id;

  const navigate = useNavigate();

  const { updateJob } = useJobs();
  const { jobsData } = useJobsContext();
  const { activeJob } = useCyclesContext();

  const iconColor = useColorModeValue('#4A5568', '#fff');

  const jobApiData = jobsData.find((item) => item.id === id);

  const disableButton = !!activeJob && activeJob.id === id;

  const handleIsHighlight = React.useCallback(
    async (isHighlight: boolean) => {
      if (jobApiData) {
        await updateJob({
          ...jobApiData,
          isHighlight,
        });
      }
    },
    [updateJob, jobApiData],
  );

  return (
    <>
      <HStack spacing="5px">
        {job?.isHighlight ? (
          <Tooltip label="Remover Destaque" hasArrow arrowSize={15}>
            <IconButton
              aria-label="Remover Destaque"
              icon={<RiUnpinLine size={22} color={iconColor} />}
              bg="transparent"
              onClick={() => handleIsHighlight(false)}
              disabled={disableButton}
            />
          </Tooltip>
        ) : (
          <Tooltip label="Marcar como Destaque" hasArrow arrowSize={15}>
            <IconButton
              aria-label="Destacar Job"
              icon={<RiPushpinLine size={22} color={iconColor} />}
              bg="transparent"
              onClick={() => handleIsHighlight(true)}
              disabled={disableButton}
            />
          </Tooltip>
        )}

        <Tooltip label="Editar" hasArrow arrowSize={15}>
          <IconButton
            aria-label="Editar Job"
            icon={<RiEdit2Line size={22} color={iconColor} />}
            bg="transparent"
            onClick={() => navigate(`/jobs/${id}/edit`)}
            disabled={disableButton}
          />
        </Tooltip>

        <Tooltip label="Deletar" hasArrow arrowSize={15}>
          <IconButton
            aria-label="Deletar Job"
            icon={<RiDeleteBin2Line size={22} color={iconColor} />}
            bg="transparent"
            onClick={onOpen}
            disabled={disableButton}
          />
        </Tooltip>
      </HStack>

      <DeleteJob job={job} isOpen={isOpen} onClose={onClose} />
    </>
  );
};
