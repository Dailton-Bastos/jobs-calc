import { Outlet } from 'react-router-dom';

import { Box, Container } from '@chakra-ui/react';

import { Header } from './components/Header';

export const WithSidebar = () => {
  return (
    <Box as="section" w="100%">
      <Header />

      <Container as="main" maxW="1440px" centerContent px="16" pt="20">
        <Outlet />
      </Container>
    </Box>
  );
};
