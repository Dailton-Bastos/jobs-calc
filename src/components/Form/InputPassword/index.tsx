import React, { ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form';
import { RiLock2Line, RiEyeLine, RiEyeOffLine } from 'react-icons/ri';

import {
  FormControl,
  Input,
  InputProps,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  FormErrorMessage,
  Button,
  Icon,
} from '@chakra-ui/react';

import { Label } from '~/components/Form/Label';

type Props = InputProps & {
  label?: string;
  error?: FieldError;
};

const InputPasswordBase: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { label, error = null, ...rest },
  ref,
) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <FormControl isInvalid={!!error}>
      {!!label && <Label>{label}</Label>}

      <InputGroup>
        <InputLeftElement pointerEvents="none" height="12">
          <RiLock2Line />
        </InputLeftElement>

        <Input
          type={showPassword ? 'text' : 'password'}
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

        <InputRightElement height="12" mr="2">
          <Button
            _hover={{
              bg: 'gray.50',
            }}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            <Icon as={showPassword ? RiEyeLine : RiEyeOffLine} />
          </Button>
        </InputRightElement>
      </InputGroup>

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const InputPassword = React.forwardRef(InputPasswordBase);
