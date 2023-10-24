import { Box, Flex, Container } from '@chakra-ui/react';

import { Notifications } from './Notifications';
import { UserIdentifier } from './UserIdentifier';

export const Header = () => {
  return (
    <Box as="header" w="100%" boxShadow="base">
      <Container maxW="1340px" centerContent p="4">
        <Flex justifyContent="end" align="center" w="100%" gap={4}>
          <Notifications />

          <UserIdentifier />
        </Flex>
      </Container>
    </Box>
  );
};
