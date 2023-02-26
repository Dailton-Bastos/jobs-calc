import { Box, Flex, GridItem, Text } from '@chakra-ui/react';

const STATUS_COLORS = {
  yellow: 'yellow.500',
  red: 'red.500',
  green: 'green.500',
  blue: 'blue.500',
} as const;

interface Props {
  children: string;
  statusColor: keyof typeof STATUS_COLORS;
}

export const JobStatus = ({ children, statusColor }: Props) => {
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
          bg={STATUS_COLORS[statusColor]}
        />

        <Text fontSize="md" color={STATUS_COLORS[statusColor]}>
          {children}
        </Text>
      </Flex>
    </GridItem>
  );
};
