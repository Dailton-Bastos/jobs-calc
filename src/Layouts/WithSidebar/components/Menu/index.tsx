import { FiMenu } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import {
  RiDashboardLine,
  RiTodoLine,
  RiFileEditLine,
  RiFilterLine,
} from 'react-icons/ri';

import {
  Menu as ChakraMenu,
  MenuButton,
  MenuList,
  IconButton,
} from '@chakra-ui/react';

import { MenuItem } from './MenuItem';

export const Menu = () => {
  return (
    <ChakraMenu isLazy gutter={16}>
      {({ isOpen }) => (
        <>
          <MenuButton
            as={IconButton}
            aria-label="Menu"
            icon={isOpen ? <MdClose size={22} /> : <FiMenu size={22} />}
            variant="outline"
          />
          <MenuList boxShadow="lg">
            <MenuItem icon={RiDashboardLine} url="/dashboard">
              Dashboard
            </MenuItem>

            <MenuItem icon={RiTodoLine} url="/jobs">
              Jobs
            </MenuItem>

            <MenuItem icon={RiFilterLine} url="/jobs/reports">
              Apontamentos
            </MenuItem>

            <MenuItem icon={RiFileEditLine} url="/editor">
              Editor
            </MenuItem>
          </MenuList>
        </>
      )}
    </ChakraMenu>
  );
};
