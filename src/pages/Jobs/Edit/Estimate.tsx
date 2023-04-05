import { RiRefreshLine, RiSave3Line } from 'react-icons/ri';

import { Button, Flex, HStack, Text } from '@chakra-ui/react';

import { useJobsContext } from '~/hooks/useJobsContext';

interface Props {
  hourEstimate: string;
  minutesEstimate: string;
  resetForm: () => void;
}

export const Estimate = ({
  hourEstimate = '00',
  minutesEstimate = '00',
  resetForm,
}: Props) => {
  const { isLoading } = useJobsContext();

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      bg="gray.100"
      boxShadow="xs"
      borderRadius="5px"
      py="8"
      px="8"
      maxW="352px"
    >
      <Text as="time" fontSize="5xl" color="purple.700">
        {`${hourEstimate}h:${minutesEstimate}m`}
      </Text>

      <HStack mt={4}>
        <Button
          type="submit"
          colorScheme="green"
          leftIcon={<RiSave3Line />}
          isLoading={isLoading}
        >
          Salvar
        </Button>

        <Button
          colorScheme="red"
          leftIcon={<RiRefreshLine />}
          onClick={resetForm}
          disabled={isLoading}
        >
          Resetar
        </Button>
      </HStack>
    </Flex>
  );
};
