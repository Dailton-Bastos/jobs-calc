import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { RiPlayMiniLine, RiPauseMiniFill } from 'react-icons/ri';

import { Flex, Box } from '@chakra-ui/react';

import { ProgressButton } from '~/components/Job/Progress/Button';
import { addJobReport } from '~/hooks/useJob';

import 'react-circular-progressbar/dist/styles.css';

interface Props {
  estimateTotalSeconds: number;
  uid: string;
  totalHourJobUsed: number;
}

export const JobProgress = ({
  estimateTotalSeconds = 0,
  uid,
  totalHourJobUsed = 0,
}: Props) => {
  const [isPaused, setIsPaused] = React.useState(true);
  const [isSaveReports, setIsSaveReports] = React.useState(false);
  const [secondsLeft, setSecondsLeft] = React.useState(0);

  const secondsLeftRef = React.useRef(secondsLeft);
  const isPausedRef = React.useRef(isPaused);

  const totalSeconds = estimateTotalSeconds - totalHourJobUsed; // hour + minutes in seconds

  const hour = Math.floor(secondsLeft / 60 / 60)
    .toString()
    .padStart(2, '0');

  const minutes = Math.floor((secondsLeft / 60) % 60)
    .toString()
    .padStart(2, '0');

  const seconds = (secondsLeft % 60).toString().padStart(2, '0');

  const percentage = Math.round(
    (secondsLeft / (totalSeconds + totalHourJobUsed)) * 100,
  );

  const tick = React.useCallback(() => {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }, []);

  const handlePayButton = React.useCallback(() => {
    setIsPaused(false);
    isPausedRef.current = false;
    setIsSaveReports(false);

    window.localStorage.setItem(
      '@JobsCalc-StartHour',
      JSON.stringify(new Date()),
    );
  }, []);

  const handlePauseButton = React.useCallback(async () => {
    setIsPaused(true);
    isPausedRef.current = true;
    setIsSaveReports(true);
  }, []);

  React.useEffect(() => {
    secondsLeftRef.current = totalSeconds;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) return;

      if (secondsLeftRef.current === 0) {
        setIsPaused(true);
        setIsSaveReports(true);

        return;
      }

      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [tick, totalSeconds]);

  React.useEffect(() => {
    async function handleSaveJobReports() {
      const hourStart = window.localStorage.getItem('@JobsCalc-StartHour');

      if (hourStart) {
        await addJobReport(uid, new Date(JSON.parse(hourStart)), new Date());

        setIsSaveReports(false);

        window.localStorage.removeItem('@JobsCalc-StartHour');
      }
    }

    if (isSaveReports) {
      handleSaveJobReports();
    }
  }, [uid, isSaveReports]);

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
        text={`${hour}:${minutes}:${seconds}`}
        styles={buildStyles({
          textColor: '#5A5A66',
          pathColor: percentage > 30 ? '#36B336' : '#EB3B35',
          trailColor: percentage === 0 ? '#EB3B35' : '#E1E3E5',
          textSize: 16,
        })}
        strokeWidth={5}
      />

      <Box mt="6">
        {isPaused ? (
          <ProgressButton
            icon={RiPlayMiniLine}
            label="Play"
            onClick={handlePayButton}
          />
        ) : (
          <ProgressButton
            icon={RiPauseMiniFill}
            label="Pause"
            onClick={handlePauseButton}
          />
        )}
      </Box>
    </Flex>
  );
};
