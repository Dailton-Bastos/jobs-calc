import type { IconType } from 'react-icons';
import { Link, useLocation } from 'react-router-dom';

import { MenuItem as ChakraMenuItem, Box } from '@chakra-ui/react';

type Props = {
  url: string;
  icon: IconType;
  children: string;
};

export const MenuItem = ({ icon: Icon, url, children }: Props) => {
  const location = useLocation();

  const { pathname } = location;

  const isActive = pathname === url;

  return (
    <ChakraMenuItem
      icon={<Icon size={24} />}
      as={Link}
      to={url}
      fontWeight="bold"
      position="relative"
      py="2"
    >
      {isActive && (
        <Box
          h="100%"
          w="2px"
          bg="orange.500"
          position="absolute"
          left="0"
          top="0"
        />
      )}

      {children}
    </ChakraMenuItem>
  );
};
