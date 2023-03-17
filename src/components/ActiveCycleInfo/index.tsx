import { Link } from 'react-router-dom';

import { Link as ChackraLink, Text, Flex } from '@chakra-ui/react';

import { useCyclesContext } from '~/hooks/useCyclesContext';

export const ActiveCycleInfo = () => {
  const { activeCycleInfo } = useCyclesContext();

  const countdownColor = activeCycleInfo?.highlight ? 'red.500' : 'gray.500';

  if (!activeCycleInfo) return <></>;

  return (
    <Flex justify="flex-end" py="2">
      <Flex align="center" justify="center" gap="2">
        <ChackraLink as={Link} to={`/jobs/${activeCycleInfo.jobId}`}>
          {activeCycleInfo.title}
        </ChackraLink>{' '}
        - <Text color={countdownColor}>{activeCycleInfo.countdown}</Text>
      </Flex>
    </Flex>
  );
};
