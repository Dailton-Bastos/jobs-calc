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
  useColorModeValue,
} from '@chakra-ui/react';

import { MenuItem } from './MenuItem';

export const Menu = () => {
  const bg = useColorModeValue('secondary.light', 'primary.dark');

  return (
    <ChakraMenu gutter={16} autoSelect={false}>
      {({ isOpen }) => (
        <>
          <MenuButton
            as={IconButton}
            aria-label="Menu"
            icon={isOpen ? <MdClose size={22} /> : <FiMenu size={22} />}
            variant="outline"
          />
          <MenuList boxShadow="lg" bg={bg}>
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
