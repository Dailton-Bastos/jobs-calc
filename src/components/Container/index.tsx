import React from 'react';

import { Box } from '@chakra-ui/react';

import { Header } from '~/components/Header';

type Props = {
  children: React.ReactElement;
  title: string;
};

export const Container = ({ children, title }: Props) => {
  return (
    <Box as="main" w="100%">
      <Header title={title} />

      <Box
        w="100%"
        maxW="1440px"
        mx="auto"
        px="12"
        position="relative"
        top="20"
      >
        <Box w="100%" maxW="1120px" mx="auto">
          {children}
        </Box>
      </Box>
    </Box>
  );
};
