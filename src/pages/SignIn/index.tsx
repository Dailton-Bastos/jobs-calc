import { Box, Image, Flex, Heading, Text, Stack, Link } from '@chakra-ui/react';

import flagsImg from '~/assets/flags.png';
import { InputEmail } from '~/components/Form/InputEmail';
import { InputPassword } from '~/components/Form/InputPassword';
import { SubmitButton } from '~/components/Form/SubmitButton';

export const SignIn = () => {
  return (
    <Flex
      direction="column"
      w="100%"
      minH="100vh"
      align="center"
      justifyContent="center"
    >
      <Flex
        as="main"
        maxW="1440px"
        w="100%"
        height="100%"
        maxH="820px"
        align="center"
        justifyContent="flex-end"
        px="200px"
      >
        <Box position="absolute" left="0">
          <Image src={flagsImg} alt="Flags dark" />
        </Box>

        <Flex direction="column" align="center">
          <Heading mb="6" fontFamily="Inter" fontWeight="semibold" size="xl">
            Bem-vindo de volta
          </Heading>

          <Text>Digite seu e-mail e senha para começar</Text>

          <Flex
            as="form"
            direction="column"
            align="center"
            justifyContent="center"
            width="390px"
            mt="10"
          >
            <Stack spacing="6" w="100%">
              <InputEmail placeholder="E-mail" />

              <InputPassword placeholder="Senha" />

              <Box textAlign="right">
                <Link>Esqueci minha senha</Link>
              </Box>
            </Stack>

            <SubmitButton
              bg="orange.300"
              width="100%"
              maxW="100%"
              mt="8"
              _hover={{
                bg: '#FA9C2D',
              }}
              _active={{
                bg: 'orange.300',
              }}
            >
              Acessar plataforma
            </SubmitButton>

            <Box mt="8" textAlign="center">
              <Link>Criar conta</Link>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
