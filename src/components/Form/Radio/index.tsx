import { Box, UseRadioProps, useRadio } from '@chakra-ui/react';

import { STATUS_COLORS } from '~/helpers/utils';

interface Props extends UseRadioProps {
  children: string;
  statusColor: keyof typeof STATUS_COLORS;
}

export const Radio = ({ children, statusColor, ...rest }: Props) => {
  const { getInputProps, getCheckboxProps } = useRadio({ ...rest });

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        bg="white"
        _checked={{
          bg: STATUS_COLORS[statusColor],
          color: 'white',
          borderColor: STATUS_COLORS[statusColor],
        }}
        px={5}
        py={1}
      >
        {children}
      </Box>
    </Box>
  );
};
