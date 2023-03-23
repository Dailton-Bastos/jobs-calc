import { Box, Flex, GridItem, Text } from '@chakra-ui/react';

import { STATUS_COLORS } from '~/helpers/utils';

interface Props {
  children: string;
  statusColor: keyof typeof STATUS_COLORS;
}

export const JobStatus = ({ children, statusColor }: Props) => {
  return (
    <GridItem w="100%">
      <Text fontWeight="bold" mb="2">
        Status
      </Text>
      <Flex gap="2" align="center" justify="flex-start">
        <Box
          w="8px"
          h="8px"
          borderRadius="50%"
          bg={STATUS_COLORS[statusColor]}
        />

        <Text fontSize="md" color={STATUS_COLORS[statusColor]}>
          {children}
        </Text>
      </Flex>
    </GridItem>
  );
};
