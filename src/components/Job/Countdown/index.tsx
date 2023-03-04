import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import { differenceInSeconds } from 'date-fns';

import 'react-circular-progressbar/dist/styles.css';
import { useJobsContext } from '~/hooks/useJobsContext';

export const Countdown = () => {
  const { activeJob, amountSecondsPassed, setSecondsPassed } = useJobsContext();

  const totalSeconds = activeJob ? activeJob?.totalMinutesAmount * 60 : 0;
  const currentSeconds = activeJob ? totalSeconds - amountSecondsPassed : 0;

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
        new Date(Number(activeJob?.startDate)),
      );

      if (secondsDifference >= totalSeconds) {
        setSecondsPassed(totalSeconds);

        return clearInterval(interval);
      }

      setSecondsPassed(secondsDifference);
    }

    if (activeJob?.startDate) {
      interval = setInterval(countdown, 1000);
    }

    return () => clearInterval(interval);
  }, [activeJob, setSecondsPassed, totalSeconds]);

  React.useEffect(() => {
    startCountdown();
  }, [startCountdown]);

  return (
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
  );
};
