import React from 'react';
import { useForm } from 'react-hook-form';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Button,
  Box,
} from '@chakra-ui/react';
import type { UseModalProps } from '@chakra-ui/react';

import { InputPassword } from '~/components/Form/InputPassword';
import { useAuth } from '~/hooks/useAuth';
import { useCustomToast } from '~/hooks/useCustomToast';
import { useReuthenticateWithCredential } from '~/hooks/useUser';

type Props = UseModalProps & {
  setUserReauthenticate: (status: boolean) => void;
};

type ReauthenticateUserData = {
  password: string;
};

export const ReauthenticateUser = ({
  onClose,
  setUserReauthenticate,
  ...props
}: Props) => {
  const { formState, handleSubmit, register, resetField } =
    useForm<ReauthenticateUserData>({
      mode: 'onSubmit',
      reValidateMode: 'onChange',
      defaultValues: {
        password: '',
      },
    });

  const { errors, isSubmitting } = formState;

  const { user } = useAuth();
  const { customToast } = useCustomToast();

  const [reauthenticateWithCredential, errorReuthenticate] =
    useReuthenticateWithCredential(user);

  const handleCloseModal = React.useCallback(() => {
    resetField('password');

    onClose();
  }, [resetField, onClose]);

  const handleSubmitForm = React.useCallback(
    async (data: ReauthenticateUserData) => {
      const { password } = data;

      const response = await reauthenticateWithCredential(password);

      if (!response) return;

      setUserReauthenticate(true);

      handleCloseModal();
    },
    [reauthenticateWithCredential, setUserReauthenticate, handleCloseModal],
  );

  React.useEffect(() => {
    if (errorReuthenticate) {
      setUserReauthenticate(false);

      customToast({
        status: 'error',
        title: 'Ocorreu um erro',
        description: 'Error ao confirmar senha',
      });
    }
  }, [customToast, errorReuthenticate, setUserReauthenticate]);

  return (
    <Modal
      onClose={handleCloseModal}
      blockScrollOnMount={false}
      isCentered
      {...props}
    >
      <ModalOverlay />
      <ModalContent bg="white">
        <ModalHeader color="black">Digite sua senha para continuar</ModalHeader>
        <ModalCloseButton />
        <Box as="form" onSubmit={handleSubmit(handleSubmitForm)}>
          <ModalBody pb={6}>
            <FormControl>
              <InputPassword
                autoFocus
                color="black"
                {...register('password', { required: 'Campo obrigatório*' })}
                error={errors?.password}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              type="submit"
              color="white"
              bg="#36B236"
              _hover={{
                bg: '#3CC73C',
              }}
              w="100%"
              fontSize="lg"
              boxShadow="md"
              mr={3}
              isLoading={isSubmitting}
            >
              Continuar
            </Button>

            <Button
              type="button"
              color="white"
              bg="#EB3B35"
              w="100%"
              fontSize="lg"
              boxShadow="md"
              _hover={{
                bg: '#FA3F38',
              }}
              disabled={isSubmitting}
              onClick={handleCloseModal}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Box>
      </ModalContent>
    </Modal>
  );
};
