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

      <NumberInput focusBorderColor="pink.500" ref={ref} {...rest}>
        <NumberInputField
          bg="white"
          h="12"
          _focusVisible={{
            borderColor: 'gray.500',
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
