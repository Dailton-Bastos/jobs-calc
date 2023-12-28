import { Box, Text } from '@chakra-ui/react';

import { useSearchContext } from '~/hooks/useSearchContext';

export const NotFound = () => {
  const { value, isLoading } = useSearchContext();

  if (value.length === 0 || isLoading) return <></>;

  return (
    <Box p="8" borderTop="1px" borderColor="gray.50">
      <Text fontWeight="bold" textAlign="center" fontSize="lg">
        Nenhum resultado encontrado
      </Text>
    </Box>
  );
};
