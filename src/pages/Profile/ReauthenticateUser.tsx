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
      <ModalContent>
        <ModalHeader>Digite sua senha para continuar</ModalHeader>
        <ModalCloseButton />
        <Box as="form" onSubmit={handleSubmit(handleSubmitForm)}>
          <ModalBody pb={6}>
            <FormControl>
              <InputPassword
                bg="gray.50"
                borderColor="gray.200"
                borderWidth="thin"
                autoFocus
                {...register('password', { required: 'Campo obrigatório*' })}
                error={errors?.password}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              type="submit"
              colorScheme="blue"
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
              colorScheme="red"
              color="#fff"
              w="100%"
              fontSize="lg"
              boxShadow="md"
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
