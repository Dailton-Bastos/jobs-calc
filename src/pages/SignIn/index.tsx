import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Link as LinkChakra,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';

import { SignInFormData } from '~/@types/signIn';
import { InputEmail } from '~/components/Form/InputEmail';
import { InputPassword } from '~/components/Form/InputPassword';
import { SubmitButton } from '~/components/Form/SubmitButton';
import { useAuth } from '~/hooks/useAuth';
import { signInFormSchema } from '~/schemas/signInFormSchema';

export const SignIn = () => {
  const { register, handleSubmit, formState } = useForm<SignInFormData>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(signInFormSchema),
  });

  const { errors, isSubmitting, dirtyFields } = formState;

  const { signIn } = useAuth();

  const onSubmit: SubmitHandler<SignInFormData> = React.useCallback(
    async (data: SignInFormData) => {
      await signIn({ ...data });
    },
    [signIn],
  );

  return (
    <Flex direction="column" align="center">
      <Heading
        mb="6"
        fontFamily="Inter"
        fontWeight="semibold"
        size="xl"
        color="variant"
      >
        Bem-vindo de volta
      </Heading>

      <Text color="variant">Digite seu e-mail e senha para começar</Text>

      <Flex
        as="form"
        direction="column"
        align="center"
        justifyContent="center"
        width="390px"
        mt="10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack spacing="6" w="100%">
          <InputEmail
            {...register('email')}
            placeholder="E-mail"
            error={errors?.email}
            isValidEmail={!!dirtyFields?.email && !errors.email?.message}
          />

          <InputPassword
            {...register('password')}
            placeholder="Senha"
            error={errors?.password}
            isValidPassword={
              !!dirtyFields?.password && !errors.password?.message
            }
          />

          <Box textAlign="right">
            <LinkChakra as={Link} to="/forgot">
              Esqueci minha senha
            </LinkChakra>
          </Box>
        </Stack>

        <SubmitButton
          bg="orange.300"
          width="100%"
          maxW="100%"
          mt="8"
          _hover={{
            bg: '#FA9C2D',
          }}
          _active={{
            bg: 'orange.300',
          }}
          isLoading={isSubmitting}
        >
          Acessar plataforma
        </SubmitButton>

        <Box mt="8" textAlign="center">
          <LinkChakra as={Link} to="/signup">
            Criar conta
          </LinkChakra>
        </Box>
      </Flex>
    </Flex>
  );
};
