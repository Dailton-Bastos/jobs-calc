import React from 'react';

import { Flex, Box, Text } from '@chakra-ui/react';
import ProgressBar from '@ramonak/react-progress-bar';

import { TimeExceeded } from './TimeExceeded';

type Props = {
  percentage: number;
  countdownText: {
    hours: string;
    minutes: string;
    seconds: string;
  };
};

export const Timer = ({ percentage, countdownText }: Props) => {
  const [isVisible, setIsVisible] = React.useState(true);

  const color = percentage <= 0 ? 'red.500' : 'blackAlpha.800';

  React.useEffect(() => {
    if (percentage > 0) {
      setIsVisible(false);

      return;
    }

    const interval = setInterval(() => setIsVisible(false), 5000);

    return () => clearInterval(interval);
  }, [percentage]);

  return (
    <Box w="100%" position="relative">
      {isVisible && <TimeExceeded />}

      <Flex align="baseline" justify="center" pb="2">
        <Box>
          <Text fontSize="5xl" color={color}>
            {countdownText.hours}
            <Text as="span" fontSize="3xl" color="orange.400">
              h
            </Text>
          </Text>
        </Box>

        <Box>
          <Text fontSize="5xl" color={color}>
            {countdownText.minutes}
            <Text as="span" fontSize="3xl" color="orange.400">
              m
            </Text>
          </Text>
        </Box>

        <Box>
          <Text fontSize="5xl" color={color}>
            {countdownText.seconds}
            <Text as="span" fontSize="3xl" color="orange.400">
              s
            </Text>
          </Text>
        </Box>
      </Flex>

      <ProgressBar
        completed={percentage <= 0 ? 100 : percentage}
        bgColor={percentage <= 0 ? '#EB3B35' : '#ED8936'}
        height="5px"
        isLabelVisible={false}
        animateOnRender
      />
    </Box>
  );
};
