import { BsBellFill } from 'react-icons/bs';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Text,
} from '@chakra-ui/react';

export const Notifications = () => {
  return (
    <Popover isLazy>
      <PopoverTrigger>
        <Button bg="transparent">
          <BsBellFill size={24} />
        </Button>
      </PopoverTrigger>

      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>
          <Text fontWeight="bold">Notificações</Text>
        </PopoverHeader>
        <PopoverBody>Ainda não tem nada por aqui!</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
