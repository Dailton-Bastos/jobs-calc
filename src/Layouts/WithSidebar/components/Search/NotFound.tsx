import { Box, Text } from '@chakra-ui/react';

export const NotFound = () => {
  return (
    <Box p="8" borderTop="1px" borderColor="gray.50">
      <Text fontWeight="bold" textAlign="center" fontSize="lg">
        Nenhum resultado encontrado
      </Text>
    </Box>
  );
};
