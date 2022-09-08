import React, { ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form';

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
};

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, Props> = (
  { label, options = [], error = null, ...rest },
  ref,
) => {
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
        ref={ref}
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

export const Select = React.forwardRef(SelectBase);
