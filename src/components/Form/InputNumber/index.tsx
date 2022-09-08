import React, { ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form';

import {
  FormControl,
  NumberInput,
  NumberInputProps,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormErrorMessage,
} from '@chakra-ui/react';

import { Label } from '~/components/Form/Label';

type Props = NumberInputProps & {
  label?: string;
  stepper?: boolean;
  error?: FieldError;
};

const InputNumberBase: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { label, stepper = false, error = null, ...rest },
  ref,
) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <Label>{label}</Label>}

      <NumberInput focusBorderColor="orange.300" ref={ref} {...rest}>
        <NumberInputField
          bg="white"
          h="12"
          borderColor="transparent"
          _hover={{
            bg: 'gray.100',
            border: '2px solid',
            borderColor: 'orange.300',
          }}
          _focusVisible={{
            bg: 'white',
            borderColor: 'orange.300',
          }}
        />

        {stepper && (
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        )}
      </NumberInput>

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const InputNumber = React.forwardRef(InputNumberBase);
