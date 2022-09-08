import React, { ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form';

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
};

const TextareaBase: ForwardRefRenderFunction<HTMLTextAreaElement, Props> = (
  { label, error = null, ...rest },
  ref,
) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <Label>{label}</Label>}

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
        ref={ref}
        {...rest}
      />

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const Textarea = React.forwardRef(TextareaBase);
