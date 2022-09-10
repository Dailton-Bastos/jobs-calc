import React from 'react';

import { Box, Flex, GridItem, Text } from '@chakra-ui/react';

interface Props {
  children: string;
  color: string;
}

export const JobStatus = ({ children, color }: Props) => {
  return (
    <GridItem w="100%">
      <Text fontWeight="bold" mb="2">
        Status:
      </Text>
      <Flex gap="2" align="center" justify="flex-start">
        <Box
          w="8px"
          h="8px"
          borderRadius="50%"
          bg="white"
          border={`2px solid ${color}`}
        />

        <Text fontSize="md" color={`${color}`}>
          {children}
        </Text>
      </Flex>
    </GridItem>
  );
};
