import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RiUserLine } from 'react-icons/ri';
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
import { Input } from '~/components/Form/Input';
import { InputEmail } from '~/components/Form/InputEmail';
import { InputPassword } from '~/components/Form/InputPassword';
import { SubmitButton } from '~/components/Form/SubmitButton';
import { useAuth } from '~/hooks/useAuth';
import { signInFormSchema } from '~/schemas/signInFormSchema';

export const Signup = () => {
  const { register, handleSubmit, formState } = useForm<SignInFormData>({
    mode: 'all',
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
      <Heading mb="6" fontFamily="Inter" fontWeight="semibold" size="xl">
        Crie sua conta
      </Heading>

      <Text>Preencha os campos abaixo para começar</Text>

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
            placeholder="Seu e-mail"
            error={errors?.email}
            isValidEmail={!!dirtyFields?.email && !errors.email?.message}
          />

          <Input placeholder="Seu nome" leftIcon={RiUserLine} />

          <InputPassword
            {...register('password')}
            placeholder="Sua senha"
            error={errors?.password}
            isValidPassword={
              !!dirtyFields?.password && !errors.password?.message
            }
          />

          <InputPassword
            {...register('password')}
            placeholder="Confirme sua senha"
            error={errors?.password}
            isValidPassword={
              !!dirtyFields?.password && !errors.password?.message
            }
          />
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
          Cadastrar
        </SubmitButton>

        <Box mt="8" textAlign="center">
          <LinkChakra as={Link} to="/">
            Voltar para login
          </LinkChakra>
        </Box>
      </Flex>
    </Flex>
  );
};
