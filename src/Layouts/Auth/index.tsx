import { Outlet, Navigate, useLocation } from 'react-router-dom';

import { Box, Image, Flex } from '@chakra-ui/react';

import flagsImg from '~/assets/flags.png';
import { useAuth } from '~/hooks/useAuth';

type propState = {
  from: { pathname: string };
};

export const Auth = () => {
  const { isAuthenticated } = useAuth();

  const location = useLocation();

  const path = location.state as propState;

  const origin = path?.from?.pathname || '/dashboard';

  if (isAuthenticated) return <Navigate to={origin} replace />;

  return (
    <Flex
      direction="column"
      w="100%"
      minH="100vh"
      align="center"
      justifyContent="center"
    >
      <Flex
        as="main"
        maxW="1440px"
        w="100%"
        height="100%"
        maxH="820px"
        align="center"
        justifyContent="flex-end"
        px="200px"
      >
        <Box position="absolute" left="0">
          <Image src={flagsImg} alt="Flags dark" />
        </Box>

        <Outlet />
      </Flex>
    </Flex>
  );
};
