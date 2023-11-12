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

import { InputPassword } from '~/components/Form/InputPassword';
import { useAuth } from '~/hooks/useAuth';
import { useCustomToast } from '~/hooks/useCustomToast';
import {
  useReuthenticateWithCredential,
  useUpdatePassword,
  useUpdateProfile,
} from '~/hooks/useUser';

import type { ProfileFormData } from '.';

type Props = {
  profileData: ProfileFormData;
  isOpen: boolean;
  onClose: () => void;
};

type ReauthenticateUserData = {
  password: string;
};

export const ReauthenticateUser = ({ isOpen, onClose, profileData }: Props) => {
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

  const [updateProfile, errorUpdateProfile] = useUpdateProfile(user);
  const [updatePassword, errorUpdatePassword] = useUpdatePassword(user);

  const [reauthenticateWithCredential, errorReuthenticate] =
    useReuthenticateWithCredential(user);

  const handleCloseModal = React.useCallback(() => {
    resetField('password');

    onClose();
  }, [resetField, onClose]);

  const updateUserProfile = React.useCallback(async () => {
    await updateProfile({
      displayName: profileData?.displayName,
      photoURL: profileData?.photoURL,
    });
  }, [updateProfile, profileData]);

  const updateUserPassword = React.useCallback(async () => {
    if (profileData?.password) {
      await updatePassword(profileData?.password);
    }
  }, [updatePassword, profileData]);

  const handleSubmitForm = React.useCallback(
    async (data: ReauthenticateUserData) => {
      const { password } = data;

      const response = await reauthenticateWithCredential(password);

      if (!response) return;

      const promises = [updateUserProfile(), updateUserPassword()];

      try {
        await Promise.all(promises);

        handleCloseModal();

        customToast({
          status: 'success',
          title: 'Perfil atualizado',
          description: 'Informações salvas com sucesso',
        });
      } catch (error) {
        throw new Error('Error to update user profile');
      }
    },
    [
      reauthenticateWithCredential,
      updateUserProfile,
      updateUserPassword,
      handleCloseModal,
      customToast,
    ],
  );

  React.useEffect(() => {
    if (errorReuthenticate || errorUpdateProfile || errorUpdatePassword) {
      customToast({
        status: 'error',
        title: 'Ocorreu um erro',
        description: 'Error ao salvar perfil',
      });
    }
  }, [
    customToast,
    errorReuthenticate,
    errorUpdateProfile,
    errorUpdatePassword,
  ]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseModal}
      isCentered
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Digite sua senha atual</ModalHeader>
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
              Salvar
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
