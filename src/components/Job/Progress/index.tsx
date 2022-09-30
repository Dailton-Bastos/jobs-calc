import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { RiPlayMiniLine, RiPauseMiniFill } from 'react-icons/ri';

import { Flex, Box } from '@chakra-ui/react';

import { AppLocalData } from '~/@types/dataLocal';
import { JobProgressProps } from '~/@types/job';
import { ProgressButton } from '~/components/Job/Progress/Button';
import { addJobReport } from '~/hooks/useJob';
import { usePersistentStorageValue } from '~/hooks/useLocalStorage';

import 'react-circular-progressbar/dist/styles.css';

export const JobProgress = ({
  estimateTotalSeconds = 0,
  uid,
  totalHourJobUsed = 0,
}: JobProgressProps) => {
  const [isPaused, setIsPaused] = React.useState(true);
  const [secondsLeft, setSecondsLeft] = React.useState(0);
  const [jobStartOfHour, setJobStartOfHour] = React.useState<Date | null>(null);
  const [jobEndOfHour, setJobEndOfHour] = React.useState<Date | null>(null);
  const [jobTimeLeftLocal, setJobTimeLeftLocal] = React.useState(0);
  const [isSavingLoading, setIsSavingLoading] = React.useState(false);

  const secondsLeftRef = React.useRef(secondsLeft);
  const isPausedRef = React.useRef(isPaused);

  const [, setAppLocalData] =
    usePersistentStorageValue<AppLocalData>('@AppJobsCalc');

  const totalSeconds = estimateTotalSeconds;

  const hour = Math.floor(secondsLeft / 60 / 60)
    .toString()
    .padStart(2, '0');

  const minutes = Math.floor((secondsLeft / 60) % 60)
    .toString()
    .padStart(2, '0');

  const seconds = (secondsLeft % 60).toString().padStart(2, '0');

  const percentage = Math.round((secondsLeft / estimateTotalSeconds) * 100);

  const tick = React.useCallback(() => {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
    setJobTimeLeftLocal(secondsLeftRef.current);
  }, []);

  const handlePlayButton = React.useCallback(() => {
    setIsPaused(false);
    isPausedRef.current = false;

    setJobStartOfHour(new Date());
  }, []);

  const handlePauseButton = React.useCallback(async () => {
    setIsPaused(true);
    isPausedRef.current = true;

    setJobEndOfHour(new Date());
  }, []);

  const handleSaveReports = React.useCallback(async () => {
    try {
      if (jobStartOfHour && jobEndOfHour) {
        setIsSavingLoading(true);

        await addJobReport(
          uid,
          new Date(jobStartOfHour),
          new Date(jobEndOfHour),
        );
      }
    } catch (error) {
      setIsSavingLoading(false);
    } finally {
      setIsSavingLoading(false);
    }
  }, [jobStartOfHour, jobEndOfHour, uid]);

  React.useEffect(() => {
    secondsLeftRef.current = totalSeconds;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) return;

      if (secondsLeftRef.current === 0) {
        setIsPaused(true);
        return;
      }

      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [tick, totalSeconds]);

  React.useEffect(() => {
    setAppLocalData((prev) => {
      return {
        ...prev,
        jobs: {
          ...prev?.jobs,
          [uid]: {
            ...prev?.jobs[uid],
            startOfHour: jobStartOfHour,
            endOfHour: jobEndOfHour,
            timeLeft: jobTimeLeftLocal,
            totalTimeUsed: totalHourJobUsed,
          },
        },
      };
    });
  }, [
    setAppLocalData,
    jobStartOfHour,
    jobEndOfHour,
    uid,
    jobTimeLeftLocal,
    totalHourJobUsed,
  ]);

  React.useEffect(() => {
    handleSaveReports();
  }, [handleSaveReports]);

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
            isLoading={isSavingLoading}
            onClick={handlePlayButton}
          />
        ) : (
          <ProgressButton
            icon={RiPauseMiniFill}
            label="Pause"
            isLoading={isSavingLoading}
            onClick={handlePauseButton}
          />
        )}
      </Box>
    </Flex>
  );
};
