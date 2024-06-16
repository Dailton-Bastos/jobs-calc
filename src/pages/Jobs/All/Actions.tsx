import React from 'react';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { MdDownloadDone } from 'react-icons/md';
import { RiDeleteBin2Line, RiPushpinLine, RiUnpinLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

import {
  HStack,
  useDisclosure,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
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

  const markJobAsDone = React.useCallback(async () => {
    if (jobApiData) {
      await updateJob({
        ...jobApiData,
        status: 'done',
        isHighlight: false,
      });
    }
  }, [updateJob, jobApiData]);

  return (
    <>
      <HStack spacing="5px">
        <Menu autoSelect={false} placement="right">
          <MenuButton
            as={IconButton}
            icon={<HiOutlineDotsVertical />}
            variant="outline"
          />

          <MenuList>
            <MenuItem _hover={{ bg: 'transparent' }}>
              <Button
                leftIcon={job.isHighlight ? <RiUnpinLine /> : <RiPushpinLine />}
                variant="solid"
                colorScheme="blue"
                w="full"
                disabled={disableButton}
                onClick={() => handleIsHighlight(!job.isHighlight)}
              >
                {job.isHighlight ? 'Remover destaque' : 'Destacar'}
              </Button>
            </MenuItem>

            {job.status.type !== 'done' && (
              <MenuItem _hover={{ bg: 'transparent' }}>
                <Button
                  leftIcon={<MdDownloadDone />}
                  variant="solid"
                  colorScheme="green"
                  w="full"
                  onClick={markJobAsDone}
                  disabled={disableButton}
                >
                  Concluir
                </Button>
              </MenuItem>
            )}

            <MenuItem _hover={{ bg: 'transparent' }}>
              <Button
                leftIcon={<RiDeleteBin2Line />}
                variant="solid"
                colorScheme="red"
                onClick={onOpen}
                w="full"
                disabled={disableButton}
              >
                Excluir
              </Button>
            </MenuItem>

            <MenuItem _hover={{ bg: 'transparent' }}>
              <Button
                variant="link"
                colorScheme="blue"
                onClick={() => navigate(`/jobs/${id}`)}
                w="full"
              >
                Ver mais
              </Button>
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>

      <DeleteJob job={job} isOpen={isOpen} onClose={onClose} />
    </>
  );
};
