import React from 'react';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { MdDownloadDone } from 'react-icons/md';
import { RiDeleteBin2Line, RiLinksLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

import {
  HStack,
  useDisclosure,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
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
            {job.status.type !== 'done' && (
              <MenuItem
                icon={<MdDownloadDone size={18} />}
                isDisabled={disableButton}
                onClick={markJobAsDone}
              >
                Concluir
              </MenuItem>
            )}

            <MenuItem
              icon={<RiDeleteBin2Line size={18} />}
              isDisabled={disableButton}
              onClick={onOpen}
            >
              Excluir
            </MenuItem>

            <MenuItem
              icon={<RiLinksLine size={18} />}
              onClick={() => navigate(`/jobs/${id}`)}
            >
              Ver mais
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>

      <DeleteJob job={job} isOpen={isOpen} onClose={onClose} />
    </>
  );
};
