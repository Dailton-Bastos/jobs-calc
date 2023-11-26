import { useFormContext } from 'react-hook-form';
import { RiRefreshLine, RiSave3Line } from 'react-icons/ri';

import {
  Button,
  Flex,
  HStack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import * as yup from 'yup';

import { jobFormValidationSchema } from '~/schemas/jobFormSchema';

interface Props {
  resetForm: () => void;
}

type EditJobFormData = yup.InferType<typeof jobFormValidationSchema>;

export const Estimate = ({ resetForm }: Props) => {
  const { watch, formState } = useFormContext<EditJobFormData>();

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
      bg={useColorModeValue('white', 'gray.200')}
      boxShadow="md"
      borderRadius="8px"
      p="8"
      h="260px"
    >
      <Text as="time" fontSize="6xl" color="black">
        {`${hourEstimate}h:${minutesEstimate}m`}
      </Text>

      <HStack mt={4} w="100%">
        <Button
          type="submit"
          color="white"
          variant="ghost"
          bg="#36B236"
          leftIcon={<RiSave3Line size={28} />}
          isLoading={isSubmitting}
          w="100%"
          fontSize="lg"
          boxShadow="md"
          _hover={{
            bg: '#3CC73C',
          }}
        >
          Salvar
        </Button>

        <Button
          color="white"
          bg="#EB3B35"
          leftIcon={<RiRefreshLine size={28} />}
          onClick={resetForm}
          disabled={isSubmitting}
          w="100%"
          fontSize="lg"
          boxShadow="md"
          _hover={{
            bg: '#FA3F38',
          }}
        >
          Resetar
        </Button>
      </HStack>
    </Flex>
  );
};
