import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
} from '@chakra-ui/react';

import { Head } from '~/components/Head';
import { Highlights } from '~/components/Highlights';
import { Sidebar } from '~/components/Sidebar';
import { UserIdentifier } from '~/components/UserIdentifier';

export const Home = () => {
  return (
    <>
      <Head title="Home" />

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
              <Container maxW="1120px" centerContent>
                <UserIdentifier />

                <Box w="100%" my="10">
                  <Heading size="md" textAlign="center">
                    Destaques <Text as="span">📌</Text>
                  </Heading>

                  <Box mt="10">
                    <Highlights />
                  </Box>
                </Box>
              </Container>
            </Container>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};
