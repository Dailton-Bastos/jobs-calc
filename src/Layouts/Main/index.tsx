import { Outlet } from 'react-router-dom';

import { Box, Container, useColorModeValue } from '@chakra-ui/react';

import { Head } from '~/components/Head';

import { Header } from './components/Header';
import { userTitle } from './hooks/useTitle';

export const MainLayout = () => {
  const bg = useColorModeValue('primary.light', 'primary.dark');
  const containerBg = useColorModeValue('secondary.light', 'whiteAlpha.400');

  const headTitle = userTitle((state) => state.pageTitle);

  return (
    <Box as="section" w="100%" minH="100vh" bg={bg}>
      <Header />

      <Head title={headTitle} />

      <Container maxW="1120px" centerContent mt="20" px="0" py="10">
        <Box
          as="main"
          px="8"
          py="12"
          bg={containerBg}
          borderRadius="5px"
          w="100%"
          boxShadow="base"
        >
          <Outlet />
        </Box>
      </Container>
    </Box>
  );
};
