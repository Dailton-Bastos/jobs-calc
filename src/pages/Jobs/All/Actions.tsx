import { RiDeleteBin2Line, RiEdit2Line, RiEyeLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import { Link as LinkChakra, HStack, Tooltip } from '@chakra-ui/react';

interface Props {
  id: string;
}

export const Actions = ({ id }: Props) => {
  return (
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
        >
          <RiEdit2Line size={22} />
        </LinkChakra>
      </Tooltip>

      <Tooltip label="Deletar" hasArrow arrowSize={15} aria-label="Deletar Job">
        <LinkChakra
          as={Link}
          to={`/jobs/${id}/edit`}
          display="flex"
          alignItems="center"
          justifyContent="center"
          p="2"
        >
          <RiDeleteBin2Line size={22} />
        </LinkChakra>
      </Tooltip>
    </HStack>
  );
};
