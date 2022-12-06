import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Flex, Text, Link as LinkChakra, Avatar } from '@chakra-ui/react';

import { useAuth } from '~/hooks/useAuth';

export const Topbar = () => {
  const { user } = useAuth();

  return (
    <Box as="header" w="100%" pt="6" pb="4" borderBottom="1px solid #CBD5E0">
      <Flex justifyContent="flex-end" gap="4">
        <Box>
          <Text fontWeight="semibold">{user?.displayName || 'Olá'}</Text>

          <LinkChakra as={Link} to="/profile">
            <Text textAlign="right" fontSize="sm">
              Ver perfil
            </Text>
          </LinkChakra>
        </Box>

        <Avatar name={user?.displayName || ''} src={user?.photoURL ?? ''} />
      </Flex>
    </Box>
  );
};
