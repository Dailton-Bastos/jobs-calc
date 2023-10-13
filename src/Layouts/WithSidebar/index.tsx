import { Outlet } from 'react-router-dom';

import { Box, Container, Grid, GridItem } from '@chakra-ui/react';

import { Sidebar } from '~/components/Sidebar';

export const WithSidebar = () => {
  return (
    <Box as="section" w="100%">
      <Grid
        templateAreas={`"sidebar main"
          "sidebar main"`}
        gridTemplateColumns={'200px 1fr'}
      >
        <GridItem area={'sidebar'}>
          <Box position="fixed" h="100%">
            <Sidebar />
          </Box>
        </GridItem>

        <GridItem area={'main'}>
          <Container as="main" maxW="1440px" centerContent px="16">
            <Outlet />
          </Container>
        </GridItem>
      </Grid>
    </Box>
  );
};