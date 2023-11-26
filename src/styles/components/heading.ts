import type { ComponentStyleConfig } from '@chakra-ui/react';
import type { StyleFunctionProps } from '@chakra-ui/styled-system';
import { mode } from '@chakra-ui/theme-tools';

export const HeadingStyle: ComponentStyleConfig = {
  baseStyle: {},
  sizes: {},
  variants: {
    primary: (props: StyleFunctionProps) => ({
      color: mode('heading.primary.dark', 'heading.primary.light')(props),
    }),
    secondary: (props: StyleFunctionProps) => ({
      color: mode('heading.secondary.dark', 'heading.secondary.light')(props),
    }),
  },
  defaultProps: {},
};
