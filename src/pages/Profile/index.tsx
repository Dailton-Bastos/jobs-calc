import { FormProvider, useForm } from 'react-hook-form';

import { Box, Flex } from '@chakra-ui/react';

import { Container } from '~/components/Container';
import { Head } from '~/components/Head';
import { Title } from '~/components/Title';
import { useAuth } from '~/hooks/useAuth';

import { Card } from './Card';
import { Form } from './Form';

export const Profile = () => {
  const { user } = useAuth();

  const emailVerified = user?.emailVerified ?? false;

  const profileForm = useForm({});

  return (
    <Box>
      <Head title={user?.displayName ?? ''} />

      <Container title="Meu Perfil">
        <FormProvider {...profileForm}>
          <Flex
            as="form"
            align="stretch"
            justifyContent="space-between"
            gap="8"
            pt="20"
          >
            {user?.email && (
              <Card
                emailVerified={emailVerified}
                email={user?.email}
                displayName={user?.displayName ?? undefined}
                photoURL={user?.photoURL ?? undefined}
              />
            )}

            <Box
              w="100%"
              bg="white"
              boxShadow="md"
              borderRadius="8px"
              py="8"
              px="12"
            >
              <Title title="Dados do perfil" />

              {user?.email && (
                <Form emailVerified={emailVerified} email={user.email} />
              )}
            </Box>
          </Flex>
        </FormProvider>
      </Container>
    </Box>
  );
};
