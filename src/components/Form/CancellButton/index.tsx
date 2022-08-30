import { RiDeleteBin7Line } from 'react-icons/ri';

import { Link } from '@chakra-ui/react';

type Props = {
  linkTo: string;
};

export const CancellButton = ({ linkTo }: Props) => {
  return (
    <Link
      href={linkTo}
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.200"
      borderRadius="5px"
      w="48px"
      h="48px"
      color="gray.500"
      p="0"
      _hover={{
        bg: 'gray.50',
      }}
    >
      <RiDeleteBin7Line size={24} />
    </Link>
  );
};
