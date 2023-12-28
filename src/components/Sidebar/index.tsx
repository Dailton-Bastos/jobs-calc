import React from 'react';
import {
  RiDashboardLine,
  RiTodoLine,
  RiFileEditLine,
  RiUserSettingsLine,
  RiLogoutBoxRLine,
  RiFilterLine,
} from 'react-icons/ri';

import { Box, List, Flex, Button } from '@chakra-ui/react';

import { Logo } from '~/components/Logo';
import { useAuth } from '~/hooks/useAuth';

import { NavLink } from './NavLink';

const SidebarMemo = () => {
  const { logout } = useAuth();

  return (
    <Flex direction="column" bg="black" pt="12" pb="8" h="100%" minW="200px">
      <Box px="8">
        <Logo />
      </Box>

      <List spacing={6} mt="14">
        <NavLink icon={RiDashboardLine} url="/dashboard">
          Dashboard
        </NavLink>

        <NavLink icon={RiTodoLine} url="/jobs">
          Jobs
        </NavLink>

        <NavLink icon={RiFilterLine} url="/jobs/reports">
          Apontamentos
        </NavLink>

        <NavLink icon={RiFileEditLine} url="/editor">
          Editor
        </NavLink>

        <NavLink icon={RiUserSettingsLine} url="/profile">
          Profile
        </NavLink>
      </List>

      <Box mt="auto" px="8">
        <Button
          leftIcon={<RiLogoutBoxRLine size={28} />}
          variant="solid"
          fontSize="md"
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

export const Sidebar = React.memo(SidebarMemo);
