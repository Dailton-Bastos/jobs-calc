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
  Box,
  keyframes,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

export const Notifications = () => {
  const animationKeyframes = keyframes`
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255, 121, 63, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(255, 121, 63, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255, 121, 63, 0); }
`;

  const animation = `${animationKeyframes} 2s infinite`;

  return (
    <Popover isLazy>
      <PopoverTrigger>
        <Button bg="transparent" position="relative">
          <Box
            as={motion.div}
            border="2px"
            borderColor="white"
            position="absolute"
            top="8px"
            right="15px"
            borderRadius="full"
            boxShadow="0 0 0 0 rgba(255, 121, 63, 0.7)"
            scale={1}
            animation={animation}
          >
            <Box
              w="8px"
              h="8px"
              bg="rgba(255, 121, 63, 1)"
              borderRadius="full"
            />
          </Box>

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
