import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import { differenceInSeconds } from 'date-fns';

import 'react-circular-progressbar/dist/styles.css';
import { secondsToTime } from '~/helpers/utils';
import { useCyclesContext } from '~/hooks/useCyclesContext';
import { useJobsContext } from '~/hooks/useJobsContext';

export const Countdown = () => {
  const { activeJob } = useJobsContext();

  const { activeCycle, amountSecondsPassed, setSecondsPassed } =
    useCyclesContext();

  const totalSeconds =
    activeCycle && activeJob ? activeJob?.totalMinutesAmount * 60 : 0;

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const { formattedTime } = secondsToTime(currentSeconds);

  const percentage = Math.round((currentSeconds / totalSeconds) * 100);

  const startCountdown = React.useCallback(() => {
    let interval: ReturnType<typeof setInterval>;

    function countdown() {
      const secondsDifference = differenceInSeconds(
        new Date(),
        new Date(Number(activeCycle?.startDate)),
      );

      if (secondsDifference >= totalSeconds) {
        setSecondsPassed(totalSeconds);

        return clearInterval(interval);
      }

      setSecondsPassed(secondsDifference);
    }

    if (activeCycle) {
      interval = setInterval(countdown, 1000);
    }

    return () => clearInterval(interval);
  }, [setSecondsPassed, totalSeconds, activeCycle]);

  React.useEffect(() => {
    startCountdown();
  }, [startCountdown]);

  return (
    <CircularProgressbar
      value={percentage}
      text={formattedTime}
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
