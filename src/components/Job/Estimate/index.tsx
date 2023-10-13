// import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Flex, Text } from '@chakra-ui/react';

import { SubmitButton } from '~/components/Form/SubmitButton';
// import { useCyclesContext } from '~/hooks/useCyclesContext';

export const JobEstimate = () => {
  const { formState, watch } = useFormContext();
  // const { activeCycleInfo } = useCyclesContext();

  const { isSubmitting } = formState;

  const hourEstimate = Number(watch('hourEstimate'))
    .toString()
    .padStart(2, '0');

  const minutesEstimate = Number(watch('minutesEstimate'))
    .toString()
    .padStart(2, '0');

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
        {`${hourEstimate}h:${minutesEstimate}m`}
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
        <SubmitButton
          isLoading={isSubmitting}
          maxW="100%"
          // disabled={!!activeCycleInfo}
        >
          Salvar
        </SubmitButton>
      </Flex>
    </Flex>
  );
};
