import { Flex, CircularProgress } from '@chakra-ui/react';

export const Loading = () => {
  return (
    <Flex
      bg="blackAlpha.100"
      align="center"
      justify="center"
      position="fixed"
      top="0"
      w="100%"
      h="100%"
      zIndex="auto"
    >
      <CircularProgress isIndeterminate color="orange.300" />
    </Flex>
  );
};
