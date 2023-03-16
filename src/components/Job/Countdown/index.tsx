import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import { Flex } from '@chakra-ui/react';

import 'react-circular-progressbar/dist/styles.css';
import { useCyclesContext } from '~/hooks/useCyclesContext';
import { useJobsContext } from '~/hooks/useJobsContext';

import { Control } from './components/Control';

export const Countdown = () => {
  const { activeCycleCurrentSeconds, countdownText } = useCyclesContext();

  const { activeJob } = useJobsContext();

  const totalSecondsAmount = activeJob ? activeJob.totalSecondsAmount : 0;

  const percentage = Math.round(
    (activeCycleCurrentSeconds / totalSecondsAmount) * 100,
  );

  const countdownStyles = React.useMemo(() => {
    const redColor = '#EB3B35';
    const greenColor = '#36B336';
    const grayColor = '#5A5A66';
    const grayLigthColor = '#E1E3E5';

    return {
      textColor: percentage <= 0 ? redColor : grayColor,
      pathColor: percentage >= 30 ? greenColor : redColor,
      trailColor: percentage <= 0 ? redColor : grayLigthColor,
      textSize: 16,
    };
  }, [percentage]);

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      bg="white"
      boxShadow="lg"
      borderRadius="5px"
      py="6"
      px="12"
      w="100%"
      maxW="352px"
    >
      <CircularProgressbar
        value={percentage}
        text={countdownText}
        strokeWidth={5}
        styles={buildStyles(countdownStyles)}
      />

      <Control />
    </Flex>
  );
};
