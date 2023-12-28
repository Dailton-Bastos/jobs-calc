import React, { ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form';
import { RiMailLine, RiCheckLine } from 'react-icons/ri';

import {
  FormControl,
  Input,
  InputProps,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  FormErrorMessage,
  useColorModeValue,
} from '@chakra-ui/react';

import { Label } from '~/components/Form/Label';

type Props = InputProps & {
  label?: string;
  error?: FieldError;
  isValidEmail: boolean;
};

const InputEmailBase: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { label, error = null, isValidEmail = false, ...rest },
  ref,
) => {
  const inputBg = useColorModeValue('gray.50', 'white');

  return (
    <FormControl isInvalid={!!error}>
      {!!label && <Label>{label}</Label>}

      <InputGroup>
        <InputLeftElement pointerEvents="none" height="12">
          <RiMailLine color={`${isValidEmail ? '#F1972C' : '#787880'}`} />
        </InputLeftElement>

        <Input
          type="email"
          variant="outline"
          bg={inputBg}
          color="black"
          focusBorderColor="orange.500"
          height="12"
          _placeholder={{
            color: '#787880',
          }}
          ref={ref}
          {...rest}
        />

        {isValidEmail && (
          <InputRightElement pointerEvents="none" height="12">
            <RiCheckLine color="#F1972C" />
          </InputRightElement>
        )}
      </InputGroup>

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const InputEmail = React.forwardRef(InputEmailBase);
