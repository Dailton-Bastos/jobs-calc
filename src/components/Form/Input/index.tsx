import React, { ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form';
import type { IconType } from 'react-icons';

import {
  FormControl,
  Input as ChackraInput,
  InputProps,
  InputGroup,
  InputLeftElement,
  FormErrorMessage,
} from '@chakra-ui/react';

import { Label } from '~/components/Form/Label';

type Props = InputProps & {
  label?: string;
  error?: FieldError;
  leftIcon?: IconType;
  isValid?: boolean;
};

const InputBase: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { label, error = null, leftIcon: LeftIcon, isValid = false, ...rest },
  ref,
) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <Label>{label}</Label>}

      <InputGroup>
        {!!LeftIcon && (
          <InputLeftElement pointerEvents="none" height="12">
            <LeftIcon color={`${isValid ? '#F1972C' : '#787880'}`} />
          </InputLeftElement>
        )}
        <ChackraInput
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
          ref={ref}
          {...rest}
        />
      </InputGroup>

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const Input = React.forwardRef(InputBase);
