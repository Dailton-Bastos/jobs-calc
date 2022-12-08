import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Flex, Text, Link as LinkChakra, Avatar } from '@chakra-ui/react';

import { useAuth } from '~/hooks/useAuth';

export const UserIdentifier = () => {
  const { user } = useAuth();

  return (
    <Box as="header" w="100%" pt="8" pb="10" borderBottom="1px solid #CBD5E0">
      <Flex justifyContent="space-between" align="center">
        <Flex gap="2" align="center">
          <Avatar
            name={user?.displayName ?? ''}
            src={user?.photoURL ?? ''}
            size="lg"
          />

          <Box>
            <Text fontWeight="semibold">
              Olá, {user?.displayName} <Text as="span">👋</Text>
            </Text>

            <Text fontSize="sm">Desenvolvedor Front-end Pleno</Text>
          </Box>
        </Flex>

        <LinkChakra
          as={Link}
          to="/jobs/new"
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="relative"
          bg="orange.300"
          borderRadius="md"
          p="3"
          h="56px"
          w="260px"
          _hover={{
            textDecoration: 'none',
          }}
        >
          <Text color="white" fontWeight="bold">
            Adicionar novo job
          </Text>
        </LinkChakra>
      </Flex>
    </Box>
  );
};
