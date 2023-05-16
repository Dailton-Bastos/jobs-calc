import { RiArrowLeftLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import { Box, Flex, Text, Link as ChakraLink } from '@chakra-ui/react';

type Props = {
  title: string;
  to?: string;
};

export const Header = ({ title, to }: Props) => {
  return (
    <Box
      as="header"
      bg="black"
      w="100%"
      position="fixed"
      left="0"
      top="0"
      zIndex="sticky"
    >
      <Box w="100%" maxW="1440px" mx="auto" px="12">
        <Flex
          h="20"
          w="100%"
          maxW="1120px"
          mx="auto"
          alignItems="center"
          justifyContent="center"
          position="relative"
        >
          <Box
            position="absolute"
            left="0"
            color="gray.400"
            _hover={{
              color: 'white',
            }}
          >
            <ChakraLink as={Link} to={to ?? '/dashboard'}>
              <RiArrowLeftLine size={24} />
            </ChakraLink>
          </Box>

          <Text
            fontSize="md"
            textAlign="center"
            color="gray.400"
            fontFamily="Inter"
            fontWeight="bold"
          >
            {title}
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};
