import { FieldError, useFormContext } from 'react-hook-form';

import {
  FormControl,
  Select as ChakraSelect,
  SelectProps,
  FormErrorMessage,
} from '@chakra-ui/react';

import { Label } from '~/components/Form/Label';

type Options = {
  name: string;
  value: string;
};

type Props = SelectProps & {
  label?: string;
  options: Options[];
  error?: FieldError;
  registerName: string;
};

export const Select = ({
  label,
  options = [],
  error,
  registerName,
  ...rest
}: Props) => {
  const { register } = useFormContext();

  return (
    <FormControl isInvalid={!!error}>
      {!!label && <Label>{label}</Label>}

      <ChakraSelect
        bg="white"
        height="12"
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
        defaultValue=""
        {...register(registerName)}
        {...rest}
      >
        <option value="" disabled>
          Selecione
        </option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </ChakraSelect>

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};
