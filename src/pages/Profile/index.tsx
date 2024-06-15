import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Box, Flex } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { ref, set } from 'firebase/database';
import * as yup from 'yup';

import { Title } from '~/components/Title';
import { auth, db } from '~/config/firebase';
import { useAuth } from '~/hooks/useAuth';
import { useCustomToast } from '~/hooks/useCustomToast';
import { useTabActive } from '~/hooks/useTabActive';
import { useUpdateProfile, useUpdatePassword } from '~/hooks/useUser';
import { userTitle } from '~/Layouts/Main/hooks/useTitle';
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

  const setPageTitle = userTitle((state) => state.setpageTitle);
  const setHeaderTitle = userTitle((state) => state.setHeaderTitle);

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
      jobber: {
        accessToken: '',
        internalId: '',
      },
    },
    resolver: yupResolver(profileFormSchema),
  });

  const { handleSubmit, reset, watch } = profileForm;

  const userId = user?.uid;

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
      const {
        displayName,
        photoURL,
        updatePassword,
        jobber: { accessToken, internalId },
      } = data;

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

      await set(ref(db, `jobber/${userId}`), {
        accessToken,
        internalId,
        userId,
      });
    },
    [updateProfile, customToast, userId],
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

  React.useEffect(() => {
    if (user?.displayName) {
      setPageTitle(user?.displayName);

      setHeaderTitle('Meu perfil');
    }
  }, [user, setPageTitle, setHeaderTitle]);

  return (
    <Box>
      <FormProvider {...profileForm}>
        <Flex
          as="form"
          align="stretch"
          justifyContent="space-between"
          gap="8"
          onSubmit={handleSubmit(handleSubmitForm)}
        >
          <Box w="100%">
            <Title title="Dados do perfil" />

            {user?.email && (
              <Form email={user.email} emailVerified={userEmailVerified} />
            )}
          </Box>

          {user && <Card user={user} emailVerified={userEmailVerified} />}
        </Flex>
      </FormProvider>

      <ReauthenticateUser
        isOpen={openModalConfirmPassword}
        onClose={onCloseReauthenticateModal}
        setUserReauthenticate={setUserReauthenticate}
      />
    </Box>
  );
};
