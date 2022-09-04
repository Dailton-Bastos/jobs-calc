import React, { ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form';
import { RiMailLine } from 'react-icons/ri';

import {
  FormControl,
  Input,
  InputProps,
  InputGroup,
  InputLeftElement,
  FormErrorMessage,
} from '@chakra-ui/react';

import { Label } from '~/components/Form/Label';

type Props = InputProps & {
  label?: string;
  error?: FieldError;
};

const InputEmailBase: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { label, error = null, ...rest },
  ref,
) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <Label>{label}</Label>}

      <InputGroup>
        <InputLeftElement pointerEvents="none" height="12">
          <RiMailLine />
        </InputLeftElement>

        <Input
          type="email"
          variant="filled"
          focusBorderColor="orange.300"
          height="12"
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

export const InputEmail = React.forwardRef(InputEmailBase);
