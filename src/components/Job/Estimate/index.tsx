import { Flex, Text } from '@chakra-ui/react';

import { CancellButton } from '~/components/Form/CancellButton';
import { SubmitButton } from '~/components/Form/SubmitButton';

type Props = {
  estimate: string;
};

export const JobEstimate = ({ estimate }: Props) => {
  const hour = estimate.padStart(2, '0');
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
        {`${hour}h:00m`}
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
        <SubmitButton>Salvar</SubmitButton>

        <CancellButton linkTo="/jobs" />
      </Flex>
    </Flex>
  );
};
