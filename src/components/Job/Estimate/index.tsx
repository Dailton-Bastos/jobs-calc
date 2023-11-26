import { useFormContext } from 'react-hook-form';
import { RiSave3Line, RiCloseCircleLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

import {
  Flex,
  Text,
  HStack,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';

import { useAuth } from '~/hooks/useAuth';
import { useCyclesContext } from '~/hooks/useCyclesContext';

export const JobEstimate = () => {
  const { formState, watch } = useFormContext();
  const { activeJob } = useCyclesContext();
  const { userEmailVerified } = useAuth();

  const { isSubmitting } = formState;

  const navigate = useNavigate();

  const disableSubmitButton = !!activeJob;

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

      <Text
        color="purple.700"
        lineHeight="7"
        textAlign="center"
        mt="6"
        fontFamily="Inter"
      >
        Preencha os dados ao lado corretamente
      </Text>

      <HStack mt={4} w="100%">
        <Button
          type="submit"
          color="white"
          bg="#36B236"
          w="100%"
          fontSize="lg"
          boxShadow="md"
          _hover={{
            bg: '#3CC73C',
          }}
          leftIcon={<RiSave3Line size={28} />}
          isLoading={isSubmitting}
          disabled={disableSubmitButton || !userEmailVerified}
        >
          Salvar
        </Button>

        <Button
          color="white"
          bg="#EB3B35"
          w="100%"
          fontSize="lg"
          boxShadow="md"
          _hover={{
            bg: '#FA3F38',
          }}
          leftIcon={<RiCloseCircleLine size={28} />}
          onClick={() => navigate('/jobs')}
          disabled={isSubmitting || !userEmailVerified}
        >
          Cancelar
        </Button>
      </HStack>
    </Flex>
  );
};
