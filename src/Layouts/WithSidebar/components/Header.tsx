import { Box, Flex, Container, useColorModeValue } from '@chakra-ui/react';

import { Logo } from '~/components/Logo';
import { SearchProvider } from '~/contexts/Search/SearchProvider';

import { Menu } from './Menu';
import { Notifications } from './Notifications';
import { Search } from './Search';
import { Theme } from './Theme';
import { UserIdentifier } from './UserIdentifier';

export const Header = () => {
  const bg = useColorModeValue('secondary.light', 'secondary.dark');
  const logoColor = useColorModeValue('#DD6B20', '#ED8936');

  return (
    <Box
      as="header"
      w="100%"
      boxShadow="base"
      bg={bg}
      position="fixed"
      left="0"
      top="0"
      zIndex="popover"
    >
      <Container maxW="1312px" centerContent py="2" px="0">
        <Flex justifyContent="space-between" align="center" w="100%" gap={4}>
          <Flex align="center" gap={4}>
            <Menu />

            <Logo color={logoColor} />
          </Flex>

          <SearchProvider>
            <Search />
          </SearchProvider>

          <Flex align="center" gap={4}>
            <Theme />

            <Notifications />

            <UserIdentifier />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};
