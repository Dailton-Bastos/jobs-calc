import React from 'react';
import { GoSearch } from 'react-icons/go';

import {
  FormControl,
  Input as ChakraInput,
  InputLeftElement,
  InputGroup,
  Icon,
} from '@chakra-ui/react';

type Props = {
  inputFocus: React.MutableRefObject<HTMLInputElement | null>;
};

export const Input = ({ inputFocus }: Props) => {
  return (
    <FormControl>
      <InputGroup>
        <ChakraInput
          placeholder="Buscar"
          variant="flushed"
          border="none"
          focusBorderColor="white"
          ref={inputFocus}
        />

        <InputLeftElement pointerEvents="none">
          <Icon as={GoSearch} color="orange.500" />
        </InputLeftElement>
      </InputGroup>
    </FormControl>
  );
};
