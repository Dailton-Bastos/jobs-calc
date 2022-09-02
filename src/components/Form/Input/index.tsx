import React, { ForwardRefRenderFunction } from 'react';

import {
  FormControl,
  Input as ChackraInput,
  InputProps,
} from '@chakra-ui/react';

import { Label } from '~/components/Form/Label';

type Props = InputProps & {
  label?: string;
};

const InputBase: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { label, ...rest },
  ref,
) => {
  return (
    <FormControl>
      {!!label && <Label>{label}</Label>}

      <ChackraInput
        bg="white"
        h="12"
        _focusVisible={{
          borderColor: 'gray.500',
        }}
        focusBorderColor="pink.500"
        ref={ref}
        {...rest}
      />
    </FormControl>
  );
};

export const Input = React.forwardRef(InputBase);
