import { IconType } from 'react-icons';
import { Link, useLocation } from 'react-router-dom';

import {
  ListItem,
  Flex,
  Link as ChakraLink,
  Icon,
  Text,
  Box,
} from '@chakra-ui/react';

type Props = {
  children: string;
  url: string;
  icon: IconType;
};

export const NavLink = ({ children, url, icon }: Props) => {
  const location = useLocation();

  const { pathname } = location;

  const isActive = pathname === url;

  return (
    <ListItem display="flex" px="8" position="relative" transition="all">
      {isActive && (
        <Box h="100%" w="2px" bg="white" position="absolute" left="0" />
      )}

      <ChakraLink
        as={Link}
        to={url}
        w="100%"
        display="inline-block"
        fontSize="md"
        color={isActive ? 'white' : 'gray.500'}
        _hover={{
          textDecor: 'none',
          color: 'white',
        }}
      >
        <Flex gap="1.5" align="center">
          <Icon as={icon} w="28px" h="28px" />
          <Text as="span">{children}</Text>
        </Flex>
      </ChakraLink>
    </ListItem>
  );
};
