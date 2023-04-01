import { RiDeleteBin2Line, RiEdit2Line, RiEyeLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import {
  Link as LinkChakra,
  HStack,
  Tooltip,
  useDisclosure,
  IconButton,
} from '@chakra-ui/react';

import { ModalDelete } from './Modal';

interface Props {
  id: string;
}

export const Actions = ({ id }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <HStack spacing="5px">
        <Tooltip
          label="Visualizar"
          hasArrow
          arrowSize={15}
          aria-label="Visualizar Job"
        >
          <LinkChakra
            as={Link}
            to={`/jobs/${id}`}
            display="flex"
            alignItems="center"
            justifyContent="center"
            p="2"
            borderRadius="md"
            _hover={{
              bg: 'gray.200',
            }}
          >
            <RiEyeLine size={22} />
          </LinkChakra>
        </Tooltip>

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

      <ModalDelete isOpen={isOpen} onClose={onClose} id={id} />
    </>
  );
};
