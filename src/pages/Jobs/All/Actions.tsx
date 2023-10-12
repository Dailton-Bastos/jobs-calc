import React from 'react';
import {
  RiDeleteBin2Line,
  RiEdit2Line,
  RiPushpinLine,
  RiUnpinLine,
} from 'react-icons/ri';
import { Link } from 'react-router-dom';

import {
  Link as LinkChakra,
  HStack,
  Tooltip,
  useDisclosure,
  IconButton,
  Button,
} from '@chakra-ui/react';

import type { IJob } from '~/@types/job';

import { ModalDelete } from './Modal';

interface Props {
  job: IJob;
}

export const Actions = ({ job }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const id = job?.id;

  const handleIsHighlight = React.useCallback((isHighlight: boolean) => {
    return isHighlight;
  }, []);

  return (
    <>
      <HStack spacing="5px">
        {job?.isHighlight ? (
          <Tooltip
            label="Remover Destaque"
            hasArrow
            arrowSize={15}
            aria-label="Remover Destaque"
          >
            <Button
              variant="link"
              display="flex"
              alignItems="center"
              justifyContent="center"
              p="2"
              borderRadius="md"
              _hover={{
                bg: 'gray.200',
              }}
              onClick={() => handleIsHighlight(true)}
            >
              <RiUnpinLine size={22} />
            </Button>
          </Tooltip>
        ) : (
          <Tooltip
            label="Marcar como Destaque"
            hasArrow
            arrowSize={15}
            aria-label="Destacar Job"
          >
            <Button
              variant="link"
              display="flex"
              alignItems="center"
              justifyContent="center"
              p="2"
              borderRadius="md"
              _hover={{
                bg: 'gray.200',
              }}
              onClick={() => handleIsHighlight(false)}
            >
              <RiPushpinLine size={22} />
            </Button>
          </Tooltip>
        )}

        <Tooltip label="Editar" hasArrow arrowSize={15} aria-label="Editar Job">
          <LinkChakra
            as={Link}
            to={`/jobs/${id}/edit`}
            display="flex"
            alignItems="center"
            justifyContent="center"
            p="2"
            borderRadius="md"
            _hover={{
              bg: 'gray.200',
            }}
          >
            <RiEdit2Line size={22} />
          </LinkChakra>
        </Tooltip>

        <Tooltip
          label="Deletar"
          hasArrow
          arrowSize={15}
          aria-label="Deletar Job"
        >
          <IconButton
            aria-label="Deletar Job"
            icon={<RiDeleteBin2Line size={22} />}
            bg="transparent"
            onClick={onOpen}
          />
        </Tooltip>
      </HStack>

      {id && <ModalDelete isOpen={isOpen} onClose={onClose} id={id} />}
    </>
  );
};
