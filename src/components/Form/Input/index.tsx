import React, { ForwardRefRenderFunction } from 'react';

import {
  FormControl,
  Input as ChackraInput,
  InputProps,
} from '@chakra-ui/react';

import { Label } from '~/components/Form/Label';

type Props = InputProps & {
  name: string;
  label?: string;
};

const InputBase: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { name, label, ...rest },
  ref,
) => {
  return (
    <FormControl>
      {!!label && <Label>{label}</Label>}

      <ChackraInput
        name={name}
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
