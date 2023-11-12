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
  IconButton,
} from '@chakra-ui/react';

import { Label } from '~/components/Form/Label';

type Props = InputProps & {
  label?: string;
  error?: FieldError;
  isValidPassword?: boolean;
  showLeftIcon?: boolean;
};

const InputPasswordBase: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  {
    label,
    error = null,
    isValidPassword = false,
    showLeftIcon = true,
    ...rest
  },
  ref,
) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <FormControl isInvalid={!!error}>
      {!!label && <Label>{label}</Label>}

      <InputGroup>
        {showLeftIcon && (
          <InputLeftElement pointerEvents="none" height="12">
            <RiLock2Line color={`${isValidPassword ? '#F1972C' : '#787880'}`} />
          </InputLeftElement>
        )}

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
          <IconButton
            aria-label="Password"
            variant="link"
            colorScheme="gray"
            size="sm"
            icon={showPassword ? <RiEyeLine /> : <RiEyeOffLine />}
            onClick={() => setShowPassword((prev) => !prev)}
          />
        </InputRightElement>
      </InputGroup>

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const InputPassword = React.forwardRef(InputPasswordBase);
