import { useFormContext, useController, FieldError } from 'react-hook-form';

import {
  FormControl,
  FormErrorMessage,
  HStack,
  useRadioGroup,
} from '@chakra-ui/react';

import { Label } from '~/components/Form/Label';
import { Radio } from '~/components/Form/Radio';
import { STATUS_COLORS } from '~/helpers/utils';

type Props = {
  name: string;
  label: string;
  options: Array<{
    name: string;
    value: string;
    statusColor: keyof typeof STATUS_COLORS;
  }>;
  error?: FieldError;
};

export const RadioGroup = ({ name, label, options, error }: Props) => {
  const { control } = useFormContext();

  const { field } = useController({ control, name });

  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    onChange: field.onChange,
    value: field.value,
  });

  const group = getRootProps();

  return (
    <FormControl isInvalid={!!error}>
      <Label fontWeight="bold">{label}</Label>

      <HStack {...group} mt="2" w="100%">
        {options?.map((option) => {
          const radio = getRadioProps({ value: option.value });

          return (
            <Radio
              key={option.name}
              {...radio}
              statusColor={option.statusColor}
              boxProps={{ flex: '1 1 0', textAlign: 'center' }}
            >
              {option.name}
            </Radio>
          );
        })}
      </HStack>

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};
