import React from 'react';
import { RiArrowLeftLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

import { Box, Flex, Text, Button } from '@chakra-ui/react';

type Props = {
  title: string;
};

export const Header = ({ title }: Props) => {
  const navigate = useNavigate();

  const handleGoBack = React.useCallback(() => {
    navigate(-1);
  }, [navigate]);

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
            <Button
              bg="transparent"
              _hover={{
                borderColor: 'gray.400',
                borderWidth: '1px',
                borderStyle: 'solid',
              }}
              onClick={handleGoBack}
            >
              <RiArrowLeftLine size={24} />
            </Button>
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
