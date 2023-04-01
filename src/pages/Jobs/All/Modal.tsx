import React from 'react';
import { RiAlertLine } from 'react-icons/ri';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  UseModalProps,
  Button,
  Flex,
} from '@chakra-ui/react';
import { ref, remove } from 'firebase/database';

import { db } from '~/config/firebase';
import { useCyclesContext } from '~/hooks/useCyclesContext';
import { useJobsContext } from '~/hooks/useJobsContext';

interface Props extends UseModalProps {
  id: string;
}

export const ModalDelete = ({ onClose, isOpen, id }: Props) => {
  const [isDeleting, setIsDeleting] = React.useState(false);

  const { deleteJob } = useJobsContext();
  const { cyclesByUser, deleteCycle } = useCyclesContext();

  const handleDeleteJob = React.useCallback(async () => {
    const jobCycles = cyclesByUser?.filter((cycle) => cycle?.jobId === id);

    const jobsRef = ref(db, `jobs/${id}`);

    try {
      setIsDeleting(true);

      const requestCycle = jobCycles?.map((cycle) => {
        const cycleRef = ref(db, `cycles/${cycle?.id}`);

        remove(cycleRef);
        if (cycle?.id) {
          deleteCycle(cycle?.id);
        }
      });

      const requestJob = remove(jobsRef);

      await Promise.all([requestCycle, requestJob]);

      setIsDeleting(false);
      deleteJob(id);
      onClose();
    } catch (error) {
      setIsDeleting(true);
      throw new Error('Erro to remove job');
    }
  }, [id, cyclesByUser, onClose, deleteJob, deleteCycle]);

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex justifyContent="center" alignItems="center">
            <RiAlertLine size={50} color="#F6E05E" />
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody textAlign="center">
          Tem certeza que deseja continuar? Essa ação não poderá ser desfeita!
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Cancelar
          </Button>

          <Button
            colorScheme="red"
            onClick={handleDeleteJob}
            isLoading={isDeleting}
          >
            Deletar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
