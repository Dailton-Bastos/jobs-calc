import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Link as LinkChakra,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { InputEmail } from '~/components/Form/InputEmail';
import { SubmitButton } from '~/components/Form/SubmitButton';
import { useCustomToast } from '~/hooks/useCustomToast';
import { useResetPassword } from '~/hooks/useUser';
import { forgotFormSchema } from '~/schemas/forgotFormSchema';

type ForgotFormData = yup.InferType<typeof forgotFormSchema>;

export const ForgotPassword = () => {
  const { register, handleSubmit, formState } = useForm<ForgotFormData>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(forgotFormSchema),
  });

  const { errors, isSubmitting, dirtyFields } = formState;

  const [resetPassword, errorSendResetPasswordEmail] = useResetPassword();

  const { customToast } = useCustomToast();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ForgotFormData> = React.useCallback(
    async ({ email }: ForgotFormData) => {
      await resetPassword(email);

      customToast({
        status: 'success',
        title: 'Verifique seu e-mail',
        description: `E-mail enviado para ${email}`,
      });

      navigate('/');
    },
    [resetPassword, customToast, navigate],
  );

  React.useEffect(() => {
    if (errorSendResetPasswordEmail) {
      customToast({
        status: 'error',
        title: 'Ocorreu um erro',
        description: 'Error ao verificar e-mail',
      });
    }
  }, [errorSendResetPasswordEmail, customToast]);

  return (
    <Flex direction="column" align="center">
      <Heading
        mb="6"
        fontFamily="Inter"
        fontWeight="semibold"
        size="xl"
        color="variant"
      >
        Recuperar senha
      </Heading>

      <Text color="variant">Digite seu e-mail para começar</Text>

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
          Recuperar
        </SubmitButton>

        <Box mt="8" textAlign="center">
          <LinkChakra as={Link} to="/">
            Voltar
          </LinkChakra>
        </Box>
      </Flex>
    </Flex>
  );
};
