import React from 'react';
import { FieldError, useFormContext } from 'react-hook-form';

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
  registerName: string;
};

export const InputNumber = ({
  label,
  stepper = false,
  error,
  registerName,
  ...rest
}: Props) => {
  const { register } = useFormContext();

  return (
    <FormControl isInvalid={!!error}>
      {!!label && <Label>{label}</Label>}

      <NumberInput focusBorderColor="orange.300" {...rest}>
        <NumberInputField
          {...register(registerName, {
            valueAsNumber: true,
          })}
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
