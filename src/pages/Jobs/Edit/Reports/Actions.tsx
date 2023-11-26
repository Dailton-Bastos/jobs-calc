import React from 'react';
import { RiDeleteBin2Line, RiEdit2Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

import {
  HStack,
  Tooltip,
  useDisclosure,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { ref, set } from 'firebase/database';

import { ModalDelete } from '~/components/ModalDelete';
import { db } from '~/config/firebase';
import { useCustomToast } from '~/hooks/useCustomToast';
import { useCyclesContext } from '~/hooks/useCyclesContext';
import { deleteCycleActions } from '~/reducers/cycles/actions';

type Props = {
  cycle: {
    startAt: string;
    finishedAt: string;
    date: {
      title: string;
      label: string;
      datetime: string;
      timestamp: number;
    };
    id: string;
    userId: string;
    startDate: number;
    fineshedDate?: number | undefined;
    jobId: string;
    isActive: boolean;
    description?: string | undefined;
  };
};

export const Actions = ({ cycle }: Props) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { cycleDispatch } = useCyclesContext();

  const navigate = useNavigate();

  const iconColor = useColorModeValue('#4A5568', '#fff');

  const { customToast } = useCustomToast();

  const handleDeleteCycle = React.useCallback(async () => {
    try {
      setIsLoading(true);

      await set(ref(db, `cycles/${cycle.id}`), null);

      cycleDispatch(deleteCycleActions(cycle.id));

      setIsLoading(false);

      onClose();
    } catch (error) {
      setIsLoading(false);

      customToast({
        status: 'error',
        title: 'Ocorreu um error',
        description: 'Error tente novamente',
      });
    } finally {
      setIsLoading(false);
    }
  }, [cycle, cycleDispatch, onClose, customToast]);

  return (
    <>
      <HStack spacing="5px">
        <Tooltip label="Editar" hasArrow arrowSize={15}>
          <IconButton
            aria-label="Editar Apontamento"
            icon={<RiEdit2Line size={22} color={iconColor} />}
            bg="transparent"
            onClick={() => navigate(`/cycles/${cycle.id}/edit`)}
            disabled={cycle.isActive}
          />
        </Tooltip>

        <Tooltip label="Deletar" hasArrow arrowSize={15}>
          <IconButton
            aria-label="Deletar Apontamento"
            icon={<RiDeleteBin2Line size={22} color={iconColor} />}
            bg="transparent"
            disabled={cycle.isActive}
            onClick={onOpen}
          />
        </Tooltip>
      </HStack>

      <ModalDelete
        title="Certeza que deseja excluir?"
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleDeleteCycle}
        isLoading={isLoading}
      />
    </>
  );
};
