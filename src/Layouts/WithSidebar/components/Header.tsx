import { FiMenu } from 'react-icons/fi';

import { Box, Flex, Container, Text, Button } from '@chakra-ui/react';

import { SearchProvider } from '~/contexts/Search/SearchProvider';

import { Notifications } from './Notifications';
import { Search } from './Search';
import { UserIdentifier } from './UserIdentifier';

export const Header = () => {
  return (
    <Box
      as="header"
      w="100%"
      boxShadow="base"
      bg="white"
      position="fixed"
      left="0"
      top="0"
    >
      <Container maxW="1340px" centerContent py="2" px="4">
        <Flex justifyContent="space-between" align="center" w="100%" gap={4}>
          <Flex align="center" gap={4}>
            <Button>
              <FiMenu size={30} />
            </Button>
            <Text>LOGO</Text>
          </Flex>

          <SearchProvider>
            <Search />
          </SearchProvider>

          <Flex align="center" gap={4}>
            <Notifications />

            <UserIdentifier />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};
