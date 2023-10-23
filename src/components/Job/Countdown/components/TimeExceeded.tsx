import { Box, Text, keyframes } from '@chakra-ui/react';
import { motion } from 'framer-motion';

export const TimeExceeded = () => {
  const animationKeyframes = keyframes`
    0% { transform: scale(0.9) }
    70% { transform: scale(1) }
    100% { transform: scale(0.9) }
  `;

  const animation = `${animationKeyframes} 2s ease-in-out infinite`;

  return (
    <Box
      as={motion.div}
      animation={animation}
      position="absolute"
      w="100%"
      top="-20px"
      left="-8px"
    >
      <Text textAlign="center" fontWeight="bold" fontSize="lg" color="red.500">
        Tempo estimado excedido!
      </Text>
    </Box>
  );
};
