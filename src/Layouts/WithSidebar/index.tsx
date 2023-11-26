import { Outlet } from 'react-router-dom';

import { Box, Container, useColorModeValue } from '@chakra-ui/react';

import { Header } from './components/Header';

export const WithSidebar = () => {
  const bg = useColorModeValue('primary.light', 'primary.dark');

  return (
    <Box as="section" w="100%" minH="100vh" bg={bg}>
      <Header />

      <Container as="main" maxW="1440px" centerContent px="16" pt="20">
        <Outlet />
      </Container>
    </Box>
  );
};
