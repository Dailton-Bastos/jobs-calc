import { LuAlertCircle } from 'react-icons/lu';

import {
  Box,
  Grid,
  VStack,
  Input as ChackraInput,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';

import { Input } from '~/components/Form/Input';
import { Label } from '~/components/Form/Label';

type Props = {
  emailVerified: boolean;
  email: string;
};

export const Form = ({ emailVerified, email }: Props) => {
  return (
    <VStack spacing="6" align="flex-start" flex="1">
      <Grid gap="6" templateColumns="1fr 1fr" w="100%" pt="8">
        <Input
          registerName="name"
          bg="gray.50"
          borderColor="gray.200"
          borderWidth="thin"
          label="Nome"
          isDisabled={!emailVerified}
        />

        <Box>
          <Label fontWeight="bold">E-mail</Label>

          <InputGroup>
            {!emailVerified && (
              <InputLeftElement pointerEvents="none" height="12">
                <LuAlertCircle color="#f1972c" size={22} />
              </InputLeftElement>
            )}

            <ChackraInput
              bg="gray.50"
              borderColor="gray.200"
              borderWidth="thin"
              height="12"
              variant="filled"
              disabled
              value={email}
              focusBorderColor="orange.300"
              _hover={{
                borderColor: 'orange.300',
              }}
              _focusVisible={{
                borderColor: 'orange.300',
              }}
            />
          </InputGroup>
        </Box>
      </Grid>

      <Input
        registerName="avatar_url"
        bg="gray.50"
        borderColor="gray.200"
        borderWidth="thin"
        label="Link da foto"
        isDisabled={!emailVerified}
      />

      <Grid gap="6" templateColumns="1fr 1fr" w="100%">
        <Input
          registerName="avatar_url"
          bg="gray.50"
          borderColor="gray.200"
          borderWidth="thin"
          label="Nova Senha"
          type="password"
          isDisabled={!emailVerified}
        />

        <Input
          registerName="avatar_url"
          bg="gray.50"
          borderColor="gray.200"
          borderWidth="thin"
          label="Confirmar Senha"
          type="password"
          isDisabled={!emailVerified}
        />
      </Grid>
    </VStack>
  );
};
