import { Box, Flex } from '@chakra-ui/react';

import { Container } from '~/components/Container';
import { Head } from '~/components/Head';

import { Form } from './Form';

export const EditJobPage = () => {
  return (
    <>
      <Head title="Editar Job" />

      <Container title="Editar Job" to="/jobs">
        <Box as="section">
          <Flex
            as="form"
            alignItems="center"
            justifyContent="space-between"
            gap="8"
          >
            <Form />
          </Flex>
        </Box>
      </Container>
    </>
  );
};
