import { FieldErrorsImpl, useFormContext } from 'react-hook-form';
import { LuAlertCircle } from 'react-icons/lu';

import {
  Box,
  Grid,
  VStack,
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

            <Input
              registerName="email"
              label=""
              isDisabled
              error={undefined}
              value={email}
            />
          </InputGroup>
        </Box>
      </Grid>

      <Input
        registerName="photoURL"
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
            label="Nova senha"
            isDisabled={!emailVerified}
            showLeftIcon={false}
            {...register('password')}
            error={errors?.password}
          />

          <InputPassword
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
