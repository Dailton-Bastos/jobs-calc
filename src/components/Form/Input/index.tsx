import { FieldError, useFormContext } from 'react-hook-form';
import type { IconType } from 'react-icons';

import {
  FormControl,
  Input as ChackraInput,
  InputProps,
  InputGroup,
  InputLeftElement,
  FormErrorMessage,
  useColorModeValue,
} from '@chakra-ui/react';

import { Label } from '~/components/Form/Label';

type Props = InputProps & {
  label?: string;
  error?: FieldError;
  leftIcon?: IconType;
  isValid?: boolean;
  registerName: string;
};

export const Input = ({
  label,
  error,
  leftIcon: LeftIcon,
  isValid = false,
  registerName,
  ...rest
}: Props) => {
  const { register } = useFormContext();

  const inputBg = useColorModeValue('gray.50', 'gray.200');

  return (
    <FormControl isInvalid={!!error}>
      {!!label && <Label fontWeight="bold">{label}</Label>}

      <InputGroup>
        {!!LeftIcon && (
          <InputLeftElement pointerEvents="none" height="12">
            <LeftIcon color={`${isValid ? '#F1972C' : '#787880'}`} />
          </InputLeftElement>
        )}
        <ChackraInput
          bg={inputBg}
          height="12"
          color="black"
          focusBorderColor="orange.500"
          {...register(registerName)}
          {...rest}
        />
      </InputGroup>

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};
