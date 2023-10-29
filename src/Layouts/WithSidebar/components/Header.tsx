import { Box, Flex, Container } from '@chakra-ui/react';

import { Logo } from '~/components/Logo';
import { SearchProvider } from '~/contexts/Search/SearchProvider';

import { Menu } from './Menu';
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
      zIndex="popover"
    >
      <Container maxW="1312px" centerContent py="2" px="0">
        <Flex justifyContent="space-between" align="center" w="100%" gap={4}>
          <Flex align="center" gap={4}>
            <Menu />

            <Logo />
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
