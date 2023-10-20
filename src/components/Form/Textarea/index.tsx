import { FieldError, useFormContext } from 'react-hook-form';

import {
  FormControl,
  Textarea as ChackraTextarea,
  TextareaProps,
  FormErrorMessage,
} from '@chakra-ui/react';

import { Label } from '~/components/Form/Label';

type Props = TextareaProps & {
  label?: string;
  error?: FieldError;
  registerName: string;
};

export const Textarea = ({ label, error, registerName, ...rest }: Props) => {
  const { register } = useFormContext();
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <Label fontWeight="bold">{label}</Label>}

      <ChackraTextarea
        bg="white"
        resize="none"
        variant="filled"
        focusBorderColor="orange.300"
        _hover={{
          bg: 'gray.100',
          borderColor: 'orange.300',
        }}
        _focusVisible={{
          bg: 'white',
          borderColor: 'orange.300',
        }}
        {...register(registerName)}
        {...rest}
      />

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};
