import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { RiPauseMiniFill, RiPlayMiniLine } from 'react-icons/ri';

import { Flex, Box, IconButton } from '@chakra-ui/react';
import { differenceInSeconds } from 'date-fns';

import 'react-circular-progressbar/dist/styles.css';
import { useJobsContext } from '~/hooks/useJobsContext';

export const Countdown = () => {
  const { job, amountSecondsPassed, setSecondsPassed } = useJobsContext();

  const totalSeconds = job ? job?.totalMinutesAmount * 60 : 0;
  const currentSeconds = job ? totalSeconds - amountSecondsPassed : 0;

  const minutesHour = Math.floor(currentSeconds / (60 * 60));
  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = minutesAmount.toString().padStart(2, '0');
  const seconds = secondsAmount.toString().padStart(2, '0');

  const percentage = Math.round((currentSeconds / totalSeconds) * 100);

  const startCountdown = React.useCallback(() => {
    let interval: ReturnType<typeof setInterval>;

    function countdown() {
      const secondsDifference = differenceInSeconds(
        new Date(),
        new Date(Number(job?.startDate)),
      );

      if (secondsDifference >= totalSeconds) {
        setSecondsPassed(totalSeconds);

        return clearInterval(interval);
      }

      setSecondsPassed(secondsDifference);
    }

    if (job) {
      interval = setInterval(countdown, 1000);
    }

    return () => clearInterval(interval);
  }, [job, setSecondsPassed, totalSeconds]);

  React.useEffect(() => {
    startCountdown();
  }, [startCountdown]);

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
        text={`${minutesHour}:${minutes}:${seconds}`}
        styles={buildStyles({
          textColor: '#5A5A66',
          pathColor: percentage > 30 ? '#36B336' : '#EB3B35',
          trailColor: percentage === 0 ? '#EB3B35' : '#E1E3E5',
          textSize: 16,
        })}
        strokeWidth={5}
      />

      <Box mt="6">
        <IconButton
          aria-label="Iniciar"
          variant="outline"
          colorScheme="green"
          size="lg"
          icon={<RiPlayMiniLine size={28} />}
        />

        <IconButton
          aria-label="Parar"
          variant="outline"
          colorScheme="red"
          size="lg"
          icon={<RiPauseMiniFill size={28} />}
        />
      </Box>
    </Flex>
  );
};
