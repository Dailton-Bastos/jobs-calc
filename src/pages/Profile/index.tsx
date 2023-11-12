import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Box, Flex } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Container } from '~/components/Container';
import { Head } from '~/components/Head';
import { Title } from '~/components/Title';
import { auth } from '~/config/firebase';
import { useAuth } from '~/hooks/useAuth';
import { useCustomToast } from '~/hooks/useCustomToast';
import { useTabActive } from '~/hooks/useTabActive';
import { useUpdateProfile, useUpdatePassword } from '~/hooks/useUser';
import { profileFormSchema } from '~/schemas/profileFormSchema';

import { Card } from './Card';
import { Form } from './Form';
import { ReauthenticateUser } from './ReauthenticateUser';

type EmailVerifiedNotification = {
  showNotification: boolean;
  status?: 'success' | 'error';
  title?: string;
  description?: string;
};

export type ProfileFormData = yup.InferType<typeof profileFormSchema>;

export const Profile = () => {
  const [userEmailVerified, setUserEmailVerified] = React.useState(false);

  const [openModalConfirmPassword, setOpenModalConfirmPassword] =
    React.useState(false);

  const [emailVerifiedNotification, setEmailVerifiedNofitication] =
    React.useState<EmailVerifiedNotification>({
      showNotification: false,
    });

  const [userReauthenticateSuccess, setUserReauthenticateSuccess] =
    React.useState<boolean | null>(null);

  const { user } = useAuth();
  const { isTabActive } = useTabActive();
  const { customToast } = useCustomToast();
  const [updateProfile, errorUpdateProfile] = useUpdateProfile(user);
  const [updateUserPassword, errorUpdateUserPassword] = useUpdatePassword(user);

  const profileForm = useForm<ProfileFormData>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      displayName: user?.displayName ?? '',
      photoURL: user?.photoURL ?? '',
      updatePassword: false,
      password: '',
      passwordConfirmation: '',
    },
    resolver: yupResolver(profileFormSchema),
  });

  const { formState, handleSubmit, reset, watch } = profileForm;

  const { errors } = formState;

  const updateUserInfo = React.useCallback(async () => {
    const displayName = watch('displayName');
    const photoURL = watch('photoURL');
    const password = watch('password');

    const updateUserProfile = updateProfile({ displayName, photoURL });

    const updatePassword = updateUserPassword(password ?? '');

    const promises = [updateUserProfile, updatePassword];

    try {
      await Promise.all(promises);

      customToast({
        status: 'success',
        title: 'Perfil atualizado',
        description: 'Informações salvas com sucesso',
      });

      setUserReauthenticateSuccess(null);
    } catch (error) {
      throw new Error('Error to update user profile');
    }
  }, [watch, updateProfile, updateUserPassword, customToast]);

  const onCloseReauthenticateModal = React.useCallback(() => {
    reset({
      updatePassword: false,
      password: '',
      passwordConfirmation: '',
    });

    setOpenModalConfirmPassword(false);
  }, [reset]);

  const setUserReauthenticate = React.useCallback((status: boolean) => {
    setUserReauthenticateSuccess(status);
  }, []);

  const handleSubmitForm = React.useCallback(
    async (data: ProfileFormData) => {
      const { displayName, photoURL, updatePassword } = data;

      if (updatePassword) {
        setOpenModalConfirmPassword(true);

        return;
      }

      const response = await updateProfile({ displayName, photoURL });

      if (!response) return;

      customToast({
        status: 'success',
        title: 'Perfil atualizado',
        description: 'Informações salvas com sucesso',
      });
    },
    [updateProfile, customToast],
  );

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (!auth?.currentUser?.emailVerified) {
        return auth?.currentUser
          ?.reload()
          .then(() => {
            if (auth?.currentUser?.emailVerified) {
              clearInterval(interval);

              setEmailVerifiedNofitication({
                showNotification: true,
                status: 'success',
                title: 'E-mail vereficado!',
                description: 'E-mail vereficado com sucesso',
              });

              setUserEmailVerified(true);
            }
          })
          .catch(() => {
            setEmailVerifiedNofitication({
              showNotification: true,
              status: 'error',
              title: 'Ocorreu um erro!',
              description: 'Erro ao verificar e-mail',
            });

            setUserEmailVerified(false);
          });
      }

      return;
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    if (isTabActive && emailVerifiedNotification.showNotification) {
      customToast({
        status: emailVerifiedNotification.status,
        title: emailVerifiedNotification.title,
        description: emailVerifiedNotification.description,
      });

      setEmailVerifiedNofitication({
        showNotification: false,
        title: '',
        description: '',
      });
    }
  }, [isTabActive, emailVerifiedNotification, customToast]);

  React.useEffect(() => {
    setUserEmailVerified(user?.emailVerified ?? false);
  }, [user]);

  React.useEffect(() => {
    if (userReauthenticateSuccess) {
      updateUserInfo();
    }
  }, [userReauthenticateSuccess, updateUserInfo]);

  React.useEffect(() => {
    if (errorUpdateProfile || errorUpdateUserPassword) {
      customToast({
        status: 'error',
        title: 'Ocorreu um erro',
        description: 'Error ao atualizar perfil',
      });
    }
  }, [errorUpdateProfile, errorUpdateUserPassword, customToast]);

  return (
    <Box>
      <Head title={user?.displayName ?? 'Meu Perfil'} />

      <Container title="Meu Perfil">
        <FormProvider {...profileForm}>
          <Flex
            as="form"
            align="stretch"
            justifyContent="space-between"
            gap="8"
            pt="20"
            onSubmit={handleSubmit(handleSubmitForm)}
          >
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
                <Form
                  errors={errors}
                  email={user.email}
                  emailVerified={userEmailVerified}
                />
              )}
            </Box>

            {user && <Card user={user} emailVerified={userEmailVerified} />}
          </Flex>
        </FormProvider>
      </Container>

      <ReauthenticateUser
        isOpen={openModalConfirmPassword}
        onClose={onCloseReauthenticateModal}
        setUserReauthenticate={setUserReauthenticate}
      />
    </Box>
  );
};
