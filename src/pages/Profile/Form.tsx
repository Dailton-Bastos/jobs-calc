import { FieldErrorsImpl, useFormContext } from 'react-hook-form';
import { LuAlertCircle } from 'react-icons/lu';

import {
  Box,
  Grid,
  VStack,
  Input as ChackraInput,
  InputGroup,
  InputLeftElement,
  Flex,
  Switch,
  FormLabel,
  Collapse,
} from '@chakra-ui/react';

import { Input } from '~/components/Form/Input';
import { InputPassword } from '~/components/Form/InputPassword';
import { Label } from '~/components/Form/Label';

import type { ProfileFormData } from '.';

type Props = {
  emailVerified: boolean;
  email: string;
  errors: FieldErrorsImpl<ProfileFormData>;
};

export const Form = ({ emailVerified, email, errors }: Props) => {
  const { register, watch } = useFormContext<ProfileFormData>();

  const updatePassword = watch('updatePassword');

  return (
    <VStack spacing="6" align="flex-start" flex="1">
      <Grid gap="6" templateColumns="1fr 1fr" w="100%" pt="8">
        <Input
          registerName="displayName"
          bg="gray.50"
          borderColor="gray.200"
          borderWidth="thin"
          label="Nome"
          isDisabled={!emailVerified}
          error={errors?.displayName}
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
        registerName="photoURL"
        bg="gray.50"
        borderColor="gray.200"
        borderWidth="thin"
        label="Link da foto"
        isDisabled={!emailVerified}
        error={errors?.photoURL}
      />

      <Flex align="center" mt={4}>
        <Switch
          {...register('updatePassword')}
          isChecked={updatePassword}
          id="updatePassword"
          colorScheme="orange"
        />

        <FormLabel htmlFor="updatePassword" m="0" ml="2">
          Alterar senha
        </FormLabel>
      </Flex>

      <Collapse in={updatePassword} animateOpacity style={{ width: '100%' }}>
        <Grid gap="6" templateColumns="1fr 1fr" w="100%">
          <InputPassword
            bg="gray.50"
            borderColor="gray.200"
            borderWidth="thin"
            label="Nova senha"
            isDisabled={!emailVerified}
            showLeftIcon={false}
            {...register('password')}
            error={errors?.password}
          />

          <InputPassword
            bg="gray.50"
            borderColor="gray.200"
            borderWidth="thin"
            label="Repetir senha"
            isDisabled={!emailVerified}
            showLeftIcon={false}
            {...register('passwordConfirmation')}
            error={errors?.passwordConfirmation}
          />
        </Grid>
      </Collapse>
    </VStack>
  );
};
