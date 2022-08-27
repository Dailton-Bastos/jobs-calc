import { RiArrowLeftLine } from 'react-icons/ri';

import { Box, Flex, Text, Link } from '@chakra-ui/react';

type Props = {
  title: string;
};

export const Header = ({ title }: Props) => {
  return (
    <Box as="header" bg="black" w="100%" position="fixed" left="0" top="0">
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
            <Link href="/">
              <RiArrowLeftLine size={24} />
            </Link>
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
