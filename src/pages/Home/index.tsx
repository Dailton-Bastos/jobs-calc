import { Box, Container, Heading, Text } from '@chakra-ui/react';

import { Head } from '~/components/Head';
import { Highlights } from '~/components/Highlights';
import { UserIdentifier } from '~/components/UserIdentifier';

export const Home = () => {
  return (
    <>
      <Head title="Dashboard" />

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
    </>
  );
};
