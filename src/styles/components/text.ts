import type { ComponentStyleConfig } from '@chakra-ui/react';
import type { StyleFunctionProps } from '@chakra-ui/styled-system';
import { mode } from '@chakra-ui/theme-tools';

export const TextStyle: ComponentStyleConfig = {
  baseStyle: {},
  sizes: {},
  variants: {
    primary: (props: StyleFunctionProps) => ({
      color: mode('text.dark.primary', 'text.light.primary')(props),
    }),
    secondary: (props: StyleFunctionProps) => ({
      color: mode('text.dark.secondary', 'text.light.secondary')(props),
    }),
  },
  defaultProps: {},
};
