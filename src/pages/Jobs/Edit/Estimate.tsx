import { RiRefreshLine, RiSave3Line } from 'react-icons/ri';

import { Button, Flex, HStack, Text } from '@chakra-ui/react';

interface Props {
  hourEstimate: string;
  minutesEstimate: string;
  resetForm: () => void;
  isLoading: boolean;
}

export const Estimate = ({
  hourEstimate = '00',
  minutesEstimate = '00',
  resetForm,
  isLoading,
}: Props) => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      bg="gray.100"
      boxShadow="xs"
      borderRadius="8px"
      p="8"
      h="260px"
    >
      <Text as="time" fontSize="6xl" color="purple.700">
        {`${hourEstimate}h:${minutesEstimate}m`}
      </Text>

      <HStack mt={4} w="100%">
        <Button
          type="submit"
          colorScheme="green"
          leftIcon={<RiSave3Line size={28} />}
          isLoading={isLoading}
          w="100%"
          fontSize="lg"
        >
          Salvar
        </Button>

        <Button
          colorScheme="red"
          leftIcon={<RiRefreshLine size={28} />}
          onClick={resetForm}
          disabled={isLoading}
          w="100%"
          fontSize="lg"
        >
          Resetar
        </Button>
      </HStack>
    </Flex>
  );
};
