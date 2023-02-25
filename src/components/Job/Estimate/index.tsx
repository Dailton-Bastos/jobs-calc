import React from 'react';

import { Flex, Text } from '@chakra-ui/react';

import { SubmitButton } from '~/components/Form/SubmitButton';

type Props = {
  hourEstimate?: number;
  minutesEstimate?: number;
  isSubmitting?: boolean;
};

export const JobEstimate = ({
  hourEstimate = 0,
  minutesEstimate = 0,
  isSubmitting = false,
}: Props) => {
  const [hour, setHour] = React.useState('');
  const [minutes, setMinutes] = React.useState('');

  React.useEffect(() => {
    if (isNaN(hourEstimate)) {
      setHour('00');
    } else {
      setHour(hourEstimate.toString().padStart(2, '0'));
    }

    if (isNaN(minutesEstimate)) {
      setMinutes('00');
    } else {
      setMinutes(minutesEstimate.toString().padStart(2, '0'));
    }
  }, [hourEstimate, minutesEstimate]);

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      bg="gray.100"
      boxShadow="xs"
      borderRadius="5px"
      py="10"
      px="14"
      maxW="352px"
    >
      <Text as="time" fontSize="5xl" color="purple.700">
        {`${hour}h:${minutes}m`}
      </Text>

      <Text
        color="purple.700"
        lineHeight="7"
        textAlign="center"
        mt="6"
        fontFamily="Inter"
      >
        Preencha os dados ao lado corretamente
      </Text>

      <Flex
        gap="4"
        mt="12"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <SubmitButton isLoading={isSubmitting} maxW="100%">
          Salvar
        </SubmitButton>
      </Flex>
    </Flex>
  );
};
