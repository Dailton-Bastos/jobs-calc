import React from 'react';
import { BsBellFill } from 'react-icons/bs';
import { MdCircle } from 'react-icons/md';
import { Link } from 'react-router-dom';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  Button,
  Text,
  Box,
  keyframes,
  Link as ChakraLink,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

import { useAuth } from '~/hooks/useAuth';
import { useCyclesContext } from '~/hooks/useCyclesContext';

export const Notifications = () => {
  const [hasJobNotification, setHasJobNotification] = React.useState(false);
  const [hasUserNotification, setHasUserNotification] = React.useState(false);

  const { activeJob } = useCyclesContext();
  const { user } = useAuth();

  const animationKeyframes = keyframes`
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255, 121, 63, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(255, 121, 63, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255, 121, 63, 0); }
`;

  const animation = `${animationKeyframes} 2s infinite`;

  const hasNotifications = hasJobNotification || hasUserNotification;

  const notifications = React.useMemo(
    () => (
      <List spacing={3}>
        {hasJobNotification && (
          <ListItem fontWeight="semibold" color="black">
            <ListIcon as={MdCircle} color="orange.500" w="15px" h="15px" />

            <ChakraLink as={Link} to={`/jobs/${activeJob?.id}`}>
              Job em andamento
            </ChakraLink>
          </ListItem>
        )}

        {hasUserNotification && (
          <>
            <ListItem fontWeight="semibold" color="black">
              <ListIcon as={MdCircle} color="orange.500" w="15px" h="15px" />

              <ChakraLink as={Link} to="/profile">
                Confirmar e-mail
              </ChakraLink>
            </ListItem>
          </>
        )}
      </List>
    ),
    [hasJobNotification, hasUserNotification, activeJob],
  );

  React.useEffect(() => {
    setHasJobNotification(!!activeJob);
  }, [activeJob]);

  React.useEffect(() => {
    setHasUserNotification(!user?.emailVerified);
  }, [user]);

  return (
    <Popover isLazy trigger="hover">
      <PopoverTrigger>
        <Button bg="transparent" position="relative">
          {hasNotifications && (
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
          )}

          <BsBellFill size={24} />
        </Button>
      </PopoverTrigger>

      <PopoverContent>
        <PopoverArrow />

        <PopoverHeader>
          <Text fontWeight="bold" color="black">
            Notificações
          </Text>
        </PopoverHeader>

        <PopoverBody>
          {hasNotifications ? (
            <>{notifications}</>
          ) : (
            <Text fontWeight="semibold" color="black" fontSize="sm">
              Ainda não tem nada por aqui!
            </Text>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
