import React from 'react';
import { useFormContext, useFormState } from 'react-hook-form';
import { LuAlertCircle } from 'react-icons/lu';
import { RiCloseCircleLine } from 'react-icons/ri';

import { Flex, VStack, Button, Text } from '@chakra-ui/react';
import { sendEmailVerification } from 'firebase/auth';
import type { User } from 'firebase/auth';

import { Avatar } from '~/components/Avatar';
import { useCustomToast } from '~/hooks/useCustomToast';

type Props = {
  user: User;
  emailVerified: boolean;
};

import type { ProfileFormData } from '.';

export const Card = ({ user, emailVerified }: Props) => {
  const [isSendEmailVerification, setIsSendEmailVerefication] =
    React.useState(false);

  const email = user?.email;

  const { customToast } = useCustomToast();
  const { isDirty, isSubmitting } = useFormState();
  const { watch } = useFormContext<ProfileFormData>();

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

  return (
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
          leftIcon={<RiCloseCircleLine size={28} />}
          disabled={isSendEmailVerification || isSubmitting}
          w="100%"
          fontSize="lg"
          boxShadow="md"
        >
          Excluir Conta
        </Button>
      </VStack>
    </Flex>
  );
};
