import { Box, Container, Heading, Text } from '@chakra-ui/react';

import { Head } from '~/components/Head';
import { Highlights } from '~/components/Highlights';

export const Home = () => {
  return (
    <>
      <Head title="Dashboard" />

      <Container maxW="1320px" centerContent px="0">
        <Box w="100%" my="10">
          <Heading
            size="lg"
            textAlign="center"
            fontWeight="bold"
            variant="primary"
          >
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
