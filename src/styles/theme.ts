import { extendTheme } from '@chakra-ui/react';
import { mode, GlobalStyleProps } from '@chakra-ui/theme-tools';

import { HeadingStyle as Heading } from './components/heading';
import { TextStyle as Text } from './components/text';

const theme = extendTheme({
  config: {
    initialColorMode: 'system',
    useSystemColorMode: true,
  },
  colors: {
    primary: {
      dark: '#121212',
      light: '#F0F2F5',
    },
    secondary: {
      dark: '#181818',
      light: '#fff',
    },
    text: {
      dark: {
        primary: '#ffffff',
        secondary: '#787880',
      },
      light: {
        primary: '#000000',
        secondary: '#787880',
      },
    },
    heading: {
      primary: {
        dark: '#222',
        light: '#fff',
      },
      secondary: {
        dark: '#787880',
        light: '#f2f2f2',
      },
    },
  },

  fonts: {
    heading: 'IBM Plex Sans',
    body: 'IBM Plex Sans',
  },

  styles: {
    global: (props: GlobalStyleProps) => ({
      body: {
        bg: mode('gray.50', '#121212')(props),
        '::-webkit-scrollbar': {
          width: '4px',
        },
        '::-webkit-scrollbar-track': {
          width: '6px',
        },
        '::-webkit-scrollbar-thumb': {
          background: mode('orange.500', '#fff')(props),
          borderRadius: '24px',
        },
      },
    }),
  },
  components: {
    Text,
    Heading,
  },
});

export { theme };
