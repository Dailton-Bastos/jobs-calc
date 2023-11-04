import { LuAlertCircle } from 'react-icons/lu';
import { RiCloseCircleLine } from 'react-icons/ri';

import { Box, Flex, VStack, Button, Text, Avatar } from '@chakra-ui/react';

type Props = {
  displayName?: string;
  email: string;
  emailVerified: boolean;
  photoURL?: string;
};

export const Card = ({
  displayName,
  email,
  emailVerified,
  photoURL,
}: Props) => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      bg="white"
      boxShadow="md"
      borderRadius="8px"
      py="8"
      px="12"
      maxW="350px"
      w="100%"
    >
      <Box p="2px" bg="orange.500" borderRadius="full" boxShadow="md">
        <Avatar
          name={displayName}
          src={photoURL}
          size="2xl"
          p="1px"
          bg="white"
          color="black"
        />
      </Box>

      <Text
        color="purple.700"
        lineHeight="7"
        textAlign="center"
        mt="6"
        fontWeight="bold"
        fontSize="2xl"
      >
        {displayName || email}
      </Text>

      <VStack w="100%" pt="10">
        {emailVerified && (
          <Button
            type="submit"
            colorScheme="green"
            // isLoading={isSubmitting}
            disabled={!emailVerified}
            w="100%"
            fontSize="lg"
            boxShadow="md"
          >
            Salvar Dados
          </Button>
        )}

        {!emailVerified && (
          <Button
            colorScheme="yellow"
            color="#fff"
            leftIcon={<LuAlertCircle size={28} />}
            // onClick={() => navigate('/jobs')}
            // disabled={isSubmitting}
            w="100%"
            fontSize="lg"
            boxShadow="md"
          >
            Confirmar E-mail
          </Button>
        )}

        <Button
          colorScheme="red"
          leftIcon={<RiCloseCircleLine size={28} />}
          // onClick={() => navigate('/jobs')}
          // disabled={isSubmitting}
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
