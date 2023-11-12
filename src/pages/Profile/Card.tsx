import React from 'react';
import { useFormContext, useFormState } from 'react-hook-form';
import { LuAlertCircle } from 'react-icons/lu';

import { Flex, VStack, Button, Text, useDisclosure } from '@chakra-ui/react';
import { sendEmailVerification } from 'firebase/auth';
import type { User } from 'firebase/auth';

import { Avatar } from '~/components/Avatar';
import { ModalDelete } from '~/components/ModalDelete';
import { useAuth } from '~/hooks/useAuth';
import { useCustomToast } from '~/hooks/useCustomToast';
import { useDeteleUser } from '~/hooks/useUser';

type Props = {
  user: User;
  emailVerified: boolean;
};

import type { ProfileFormData } from '.';
import { ReauthenticateUser } from './ReauthenticateUser';

export const Card = ({ user, emailVerified }: Props) => {
  const [isSendEmailVerification, setIsSendEmailVerefication] =
    React.useState(false);

  const [userReauthenticateSuccess, setUserReauthenticateSuccess] =
    React.useState<boolean | null>(null);

  const email = user?.email;

  const { logout } = useAuth();

  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isOpenModalConfirmPassword,
    onClose: onCloseReauthenticateModal,
    onOpen: onOpenModalConfirmPassword,
  } = useDisclosure();

  const { customToast } = useCustomToast();
  const { isDirty, isSubmitting } = useFormState();
  const { watch } = useFormContext<ProfileFormData>();

  const [deleteUser, errorDeleteUser] = useDeteleUser(user);

  const displayName = watch('displayName') || user?.displayName || '';
  const photoUrl = watch('photoURL') || user?.photoURL || '';

  let userAvatar = <Avatar size="2xl" bg="orange.500" />;

  if (displayName) {
    userAvatar = (
      <Avatar name={displayName} size="2xl" bg="orange.500" color="white" />
    );
  }

  if (photoUrl) {
    userAvatar = <Avatar src={photoUrl} showBorder size="2xl" />;
  }

  const setUserReauthenticate = React.useCallback((status: boolean) => {
    setUserReauthenticateSuccess(status);
  }, []);

  const handleSendEmailVerfication = React.useCallback(async () => {
    try {
      setIsSendEmailVerefication(true);

      await sendEmailVerification(user);

      customToast({
        title: 'Verifique seu e-mail',
        description: `E-mail enviado para ${email}`,
        status: 'success',
      });

      setIsSendEmailVerefication(false);
    } catch (error) {
      setIsSendEmailVerefication(false);

      customToast({
        title: 'Ocorreu um erro!',
        description: 'Tente novamente.',
        status: 'error',
      });
    }
  }, [user, customToast, email]);

  const handleDeleteUserAccount = React.useCallback(async () => {
    const response = await deleteUser();

    if (!response) return;

    setUserReauthenticateSuccess(null);

    logout();

    customToast({
      status: 'success',
      title: 'Conta excluída',
      description: 'Conta excluída com sucesso',
    });
  }, [deleteUser, logout, customToast]);

  React.useEffect(() => {
    if (userReauthenticateSuccess) {
      handleDeleteUserAccount();
    }
  }, [userReauthenticateSuccess, handleDeleteUserAccount]);

  React.useEffect(() => {
    if (errorDeleteUser) {
      customToast({
        status: 'error',
        title: 'Ocorreu um erro',
        description: 'Error ao excluir conta',
      });
    }
  }, [errorDeleteUser, customToast]);

  return (
    <>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        bg="white"
        boxShadow="md"
        borderRadius="8px"
        py="8"
        maxW="350px"
        w="100%"
      >
        {userAvatar}

        <Text
          color="purple.700"
          lineHeight="7"
          textAlign="center"
          mt="6"
          fontWeight="bold"
          fontSize="2xl"
          wordBreak="break-word"
        >
          {displayName || email}
        </Text>

        <VStack w="100%" pt="10" px="6">
          {emailVerified && (
            <Button
              type="submit"
              colorScheme="green"
              isLoading={isSubmitting}
              w="100%"
              fontSize="lg"
              boxShadow="md"
              disabled={!isDirty}
            >
              Salvar Dados
            </Button>
          )}

          {!emailVerified && (
            <Button
              colorScheme="yellow"
              color="#fff"
              w="100%"
              fontSize="lg"
              boxShadow="md"
              leftIcon={<LuAlertCircle size={28} />}
              onClick={handleSendEmailVerfication}
              isLoading={isSendEmailVerification}
            >
              Confirmar E-mail
            </Button>
          )}

          <Button
            colorScheme="red"
            w="100%"
            fontSize="lg"
            boxShadow="md"
            onClick={onOpen}
            disabled={isSendEmailVerification || isSubmitting}
          >
            Excluir Conta
          </Button>
        </VStack>
      </Flex>

      <ModalDelete
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={onOpenModalConfirmPassword}
        title="Tem certeza que quer excluir sua conta?"
      />

      <ReauthenticateUser
        isOpen={isOpenModalConfirmPassword}
        onClose={onCloseReauthenticateModal}
        setUserReauthenticate={setUserReauthenticate}
      />
    </>
  );
};
