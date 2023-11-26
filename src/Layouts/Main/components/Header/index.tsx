import React from 'react';
import { RiArrowLeftLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

import { Box, Flex, Text, IconButton } from '@chakra-ui/react';

import { Logo } from '~/components/Logo';

import { userTitle } from '../../hooks/useTitle';

export const Header = () => {
  const navigate = useNavigate();

  const title = userTitle((state) => state.headerTitle);

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
          <Flex alignItems="center" gap={4} position="absolute" left="0">
            <IconButton
              aria-label="Voltar"
              variant="unstyled"
              icon={<RiArrowLeftLine size={24} color="#fff" />}
              onClick={handleGoBack}
            />
            <Logo color="#fff" />
          </Flex>

          <Text
            fontSize="md"
            textAlign="center"
            color="white"
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
