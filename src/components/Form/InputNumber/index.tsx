import React, { ForwardRefRenderFunction } from 'react';

import {
  FormControl,
  NumberInput,
  NumberInputProps,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';

import { Label } from '~/components/Form/Label';

type Props = NumberInputProps & {
  name: string;
  label?: string;
  stepper?: boolean;
};

const InputNumberBase: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { name, label, stepper = false, ...rest },
  ref,
) => {
  return (
    <FormControl>
      {!!label && <Label>{label}</Label>}

      <NumberInput name={name} focusBorderColor="pink.500" ref={ref} {...rest}>
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
    </FormControl>
  );
};

export const InputNumber = React.forwardRef(InputNumberBase);
