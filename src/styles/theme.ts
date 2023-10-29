import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    black: '#222222',
    gray: {
      '50': '#F0F2F5',
      '100': '#FCFDFF',
      '200': '#E1E3E5',
      '400': '#BFBFCC',
      '500': '#787880',
    },
    green: {
      '500': '#36B336',
    },
    purple: {
      '700': '#5A5A66',
      '800': '#41414C',
    },
    orange: {
      '300': '#F1972C',
    },
    red: {
      '500': '#EB3B35',
    },
  },

  fonts: {
    heading: 'IBM Plex Sans',
    body: 'IBM Plex Sans',
  },

  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.500',
        '::-webkit-scrollbar': {
          width: '4px',
        },
        '::-webkit-scrollbar-track': {
          width: '6px',
        },
        '::-webkit-scrollbar-thumb': {
          background: 'orange.500',
          borderRadius: '24px',
        },
      },
    },
  },
});

export { theme };
