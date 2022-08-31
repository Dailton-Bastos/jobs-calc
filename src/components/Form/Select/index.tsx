import React, { ForwardRefRenderFunction } from 'react';

import {
  FormControl,
  Select as ChakraSelect,
  SelectProps,
} from '@chakra-ui/react';

import { Label } from '~/components/Form/Label';

type Options = {
  name: string;
  value: string;
};

type Props = SelectProps & {
  name: string;
  label?: string;
  options: Options[];
};

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, Props> = (
  { name, label, options = [], ...rest },
  ref,
) => {
  return (
    <FormControl>
      {!!label && <Label>{label}</Label>}

      <ChakraSelect
        bg="white"
        h="12"
        focusBorderColor="pink.500"
        _focusVisible={{
          borderColor: 'gray.500',
        }}
        defaultValue=""
        name={name}
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
    </FormControl>
  );
};

export const Select = React.forwardRef(SelectBase);
