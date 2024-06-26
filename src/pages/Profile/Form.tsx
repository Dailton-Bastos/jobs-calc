import { useFormContext } from 'react-hook-form';
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
  Input as ChackraInput,
  useColorModeValue,
} from '@chakra-ui/react';

import { Input } from '~/components/Form/Input';
import { InputPassword } from '~/components/Form/InputPassword';
import { Label } from '~/components/Form/Label';
import { Title } from '~/components/Title';

import type { ProfileFormData } from '.';

type Props = {
  emailVerified: boolean;
  email: string;
};

export const Form = ({ emailVerified, email }: Props) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<ProfileFormData>();

  const updatePassword = watch('updatePassword');

  const inputBg = useColorModeValue('gray.50', 'gray.200');

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

            <ChackraInput
              value={email}
              disabled
              bg={inputBg}
              height="12"
              color="black"
              focusBorderColor="orange.500"
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

      <Box w="100%">
        <Title title="Jobber" />

        <Grid gap="6" templateColumns="1fr 180px" w="100%" pt="6">
          <InputPassword
            label="Token de acesso"
            {...register('jobber.accessToken')}
          />

          <InputPassword
            label="ID atividade interna"
            showLeftIcon={false}
            {...register('jobber.internalId')}
            error={errors.jobber?.internalId}
          />
        </Grid>
      </Box>
    </VStack>
  );
};
