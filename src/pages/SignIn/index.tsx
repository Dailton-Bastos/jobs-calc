import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Box, Image, Flex, Heading, Text, Stack, Link } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';

import { SignInFormData } from '~/@types/signIn';
import flagsImg from '~/assets/flags.png';
import { InputEmail } from '~/components/Form/InputEmail';
import { InputPassword } from '~/components/Form/InputPassword';
import { SubmitButton } from '~/components/Form/SubmitButton';
import { useAuth } from '~/hooks/useAuth';
import { signInFormSchema } from '~/schemas/signInFormSchema';

export const SignIn = () => {
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
    <Flex
      direction="column"
      w="100%"
      minH="100vh"
      align="center"
      justifyContent="center"
    >
      <Flex
        as="main"
        maxW="1440px"
        w="100%"
        height="100%"
        maxH="820px"
        align="center"
        justifyContent="flex-end"
        px="200px"
      >
        <Box position="absolute" left="0">
          <Image src={flagsImg} alt="Flags dark" />
        </Box>

        <Flex direction="column" align="center">
          <Heading mb="6" fontFamily="Inter" fontWeight="semibold" size="xl">
            Bem-vindo de volta
          </Heading>

          <Text>Digite seu e-mail e senha para começar</Text>

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
                <Link>Esqueci minha senha</Link>
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
              <Link>Criar conta</Link>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
