import { Box, UseRadioProps, useRadio, BoxProps } from '@chakra-ui/react';

import { STATUS_COLORS } from '~/helpers/utils';

interface Props extends UseRadioProps {
  children: string;
  statusColor: keyof typeof STATUS_COLORS;
  boxProps?: BoxProps;
}

export const Radio = ({ children, statusColor, boxProps, ...rest }: Props) => {
  const { getInputProps, getCheckboxProps } = useRadio({ ...rest });

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label" {...boxProps}>
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        bg="white"
        color="black"
        _checked={{
          bg: STATUS_COLORS[statusColor],
          color: 'white',
          borderColor: STATUS_COLORS[statusColor],
        }}
        _hover={{
          borderColor: 'orange.500',
        }}
        py="2"
      >
        {children}
      </Box>
    </Box>
  );
};
