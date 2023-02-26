import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { RiPauseMiniFill, RiPlayMiniLine } from 'react-icons/ri';

import { Flex, Box, IconButton } from '@chakra-ui/react';

// import { JobProgressProps } from '~/@types/job';
// import { ProgressButton } from '~/components/Job/Progress/Button';

import 'react-circular-progressbar/dist/styles.css';

export const Countdown = () => {
  // const [isPaused, setIsPaused] = React.useState(true);
  // const [secondsLeft, setSecondsLeft] = React.useState(0);

  // const secondsLeftRef = React.useRef(secondsLeft);
  // const isPausedRef = React.useRef(isPaused);

  // const totalSeconds = React.useMemo(() => {
  //   return estimateTotalSeconds - totalHourJobUsed;
  // }, [totalHourJobUsed, estimateTotalSeconds]);

  // const hour = Math.floor(secondsLeft / 60 / 60)
  //   .toString()
  //   .padStart(2, '0');

  // const minutes = Math.floor((secondsLeft / 60) % 60)
  //   .toString()
  //   .padStart(2, '0');

  // const seconds = (secondsLeft % 60).toString().padStart(2, '0');

  // const percentage = Math.round((secondsLeft / estimateTotalSeconds) * 100);

  // const tick = React.useCallback(() => {
  //   secondsLeftRef.current--;
  //   setSecondsLeft(secondsLeftRef.current);
  // }, []);

  // const handlePlayButton = React.useCallback(() => {
  //   setIsPaused(false);
  //   isPausedRef.current = false;
  // }, []);

  // const handlePauseButton = React.useCallback(async () => {
  //   setIsPaused(true);
  //   isPausedRef.current = true;
  // }, []);

  // React.useEffect(() => {
  //   secondsLeftRef.current = totalSeconds;
  //   setSecondsLeft(secondsLeftRef.current);

  //   const interval = setInterval(() => {
  //     if (isPausedRef.current) return;

  //     if (secondsLeftRef.current === 0) {
  //       setIsPaused(true);
  //       return;
  //     }

  //     tick();
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [tick, totalSeconds]);

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
        value={30}
        text={`${1}:${5}:${0}`}
        styles={buildStyles({
          textColor: '#5A5A66',
          pathColor: '#36B336',
          trailColor: '#E1E3E5',
          // pathColor: percentage > 30 ? '#36B336' : '#EB3B35',
          // trailColor: percentage === 0 ? '#EB3B35' : '#E1E3E5',
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