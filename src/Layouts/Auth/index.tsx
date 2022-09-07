import { Navigate, Route, Routes } from 'react-router-dom';

import { Box, Image, Flex } from '@chakra-ui/react';

import flagsImg from '~/assets/flags.png';
import { useAuth } from '~/hooks/useAuth';
import { ForgotPassword } from '~/pages/Forgot';
import { SignIn } from '~/pages/SignIn';
import { SignUp } from '~/pages/Signup';

export const Auth = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return <Navigate to="/dashboard" />;

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

        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot" element={<ForgotPassword />} />
        </Routes>
      </Flex>
    </Flex>
  );
};
