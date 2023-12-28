import { IoSunny, IoMoon } from 'react-icons/io5';
import { TbSunMoon } from 'react-icons/tb';

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Tooltip,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';

export const Theme = () => {
  const { setColorMode } = useColorMode();

  const bg = useColorModeValue('secondary.light', 'primary.dark');

  return (
    <Menu placement="bottom">
      <Tooltip
        label={`Aparência: Tema ${useColorModeValue('claro', 'escuro')}`}
      >
        <MenuButton
          as={IconButton}
          aria-label="Theme"
          variant="ghost"
          icon={useColorModeValue(<IoSunny size={24} />, <IoMoon size={24} />)}
        />
      </Tooltip>

      <MenuList boxShadow="lg" bg={bg}>
        <MenuItem
          icon={<IoSunny size={22} />}
          onClick={() => setColorMode('light')}
        >
          Tema claro
        </MenuItem>

        <MenuItem
          icon={<IoMoon size={22} />}
          onClick={() => setColorMode('dark')}
        >
          Tema escuro
        </MenuItem>

        <MenuItem
          icon={<TbSunMoon size={22} />}
          onClick={() => setColorMode('system')}
        >
          Padrão do dispositivo
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
