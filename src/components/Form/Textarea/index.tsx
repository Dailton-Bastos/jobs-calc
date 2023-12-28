import { FieldError, useFormContext } from 'react-hook-form';

import {
  FormControl,
  Textarea as ChackraTextarea,
  TextareaProps,
  FormErrorMessage,
  useColorModeValue,
} from '@chakra-ui/react';

import { Label } from '~/components/Form/Label';

type Props = TextareaProps & {
  label?: string;
  error?: FieldError;
  registerName: string;
};

export const Textarea = ({ label, error, registerName, ...rest }: Props) => {
  const { register } = useFormContext();

  const bg = useColorModeValue('gray.50', 'gray.200');

  return (
    <FormControl isInvalid={!!error}>
      {!!label && <Label fontWeight="bold">{label}</Label>}

      <ChackraTextarea
        bg={bg}
        resize="none"
        color="black"
        focusBorderColor="orange.500"
        {...register(registerName)}
        {...rest}
      />

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};
