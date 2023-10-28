import {
  RiLogoutBoxRLine,
  RiTodoLine,
  RiUserSettingsLine,
} from 'react-icons/ri';
import { Link } from 'react-router-dom';

import {
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  Link as ChakraLink,
  List,
  ListItem,
  ListIcon,
  Button,
  Box,
  Flex,
  keyframes,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

import { ReactComponent as HelloEmoji } from '~/assets/hello-emoji.svg';
import { useAuth } from '~/hooks/useAuth';

export const UserIdentifier = () => {
  const { user, logout } = useAuth();

  const animationKeyframes = keyframes`
  0% { transform: rotate(0deg) }
  10% { transform: rotate(14deg) }
  20% { transform: rotate(-8deg) }
  30% { transform: rotate(14deg) }
  40% { transform: rotate(-4deg) }
  50% { transform: rotate(10deg) }
  60% { transform: rotate(0deg) }
  100% { transform: rotate(0deg) }
`;

  const animation = `${animationKeyframes} 2.5s ease-in-out`;

  return (
    <Popover isLazy placement="top-end">
      <PopoverTrigger>
        <Box
          cursor="pointer"
          p="2px"
          bg="orange.500"
          borderRadius="full"
          boxShadow="md"
        >
          <Avatar
            name={user?.displayName ?? ''}
            src="https://avatars0.githubusercontent.com/u/36246937?v=4"
            size="md"
            p="1px"
            bg="white"
          />
        </Box>
      </PopoverTrigger>

      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader p={4} fontWeight="bold">
          <Flex align="center" gap={2}>
            Olá, {user?.displayName}
            <Box
              as={motion.div}
              animation={animation}
              transformOrigin="70% 70%"
            >
              <HelloEmoji />
            </Box>
          </Flex>
        </PopoverHeader>
        <PopoverBody py={6} px={4}>
          <List spacing={4}>
            <ListItem>
              <ChakraLink as={Link} to="/profile" fontWeight="semibold">
                <ListIcon as={RiUserSettingsLine} w="22px" h="22px" />
                Meu perfil
              </ChakraLink>
            </ListItem>

            <ListItem>
              <ChakraLink as={Link} to="/jobs" fontWeight="semibold">
                <ListIcon as={RiTodoLine} w="22px" h="22px" />
                Meus jobs
              </ChakraLink>
            </ListItem>

            <ListItem>
              <Button
                leftIcon={<RiLogoutBoxRLine size={22} />}
                variant="link"
                onClick={logout}
              >
                Sair da plataforma
              </Button>
            </ListItem>
          </List>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
