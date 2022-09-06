import {
  RiDashboardLine,
  RiTodoLine,
  RiFileEditLine,
  RiUserSettingsLine,
  RiLogoutBoxRLine,
} from 'react-icons/ri';

import { Box, List, Flex, Button } from '@chakra-ui/react';

import { Logo } from '~/components/Logo';
import { useAuth } from '~/hooks/useAuth';

import { NavLink } from './NavLink';

export const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <Flex
      direction="column"
      bg="black"
      pt="12"
      pb="8"
      px="8"
      h="100%"
      minW="200px"
    >
      <Logo />

      <List spacing={6} mt="14">
        <NavLink icon={RiDashboardLine} url="/">
          Overview
        </NavLink>

        <NavLink icon={RiTodoLine} url="/jobs">
          Jobs
        </NavLink>

        <NavLink icon={RiFileEditLine} url="/editor">
          Editor
        </NavLink>

        <NavLink icon={RiUserSettingsLine} url="/profile">
          Profile
        </NavLink>
      </List>

      <Box mt="auto">
        <Button
          leftIcon={<RiLogoutBoxRLine />}
          variant="solid"
          bg="black"
          _hover={{
            bg: 'black',
            color: 'white',
          }}
          onClick={logout}
        >
          Log out
        </Button>
      </Box>
    </Flex>
  );
};
