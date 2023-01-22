import { Box, Flex, Text, Avatar } from '@chakra-ui/react';

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
      </Flex>
    </Box>
  );
};
