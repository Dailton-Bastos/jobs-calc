import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import { differenceInSeconds } from 'date-fns';

import 'react-circular-progressbar/dist/styles.css';
import { secondsToTime } from '~/helpers/utils';
import { useCyclesContext } from '~/hooks/useCyclesContext';
import { useJobsContext } from '~/hooks/useJobsContext';

interface Props {
  totalCyclesHours: number;
}

export const Countdown = ({ totalCyclesHours }: Props) => {
  const [countdownText, setCountdownText] = React.useState('00:00:00');

  const {
    activeCycle,
    activeCycleTotalSeconds,
    activeCycleCurrentSeconds,
    setSecondsPassed,
    amountSecondsPassed,
  } = useCyclesContext();

  const { activeJob } = useJobsContext();

  const totalSecondsAmount = activeJob ? activeJob.totalSecondsAmount : 0;

  const percentage = Math.round(
    (activeCycleCurrentSeconds / totalSecondsAmount) * 100,
  );

  const countdownValue = React.useCallback(() => {
    const totalCount =
      activeCycleCurrentSeconds >= 1
        ? activeCycleCurrentSeconds
        : totalCyclesHours + amountSecondsPassed;

    const { formattedTime } = secondsToTime(totalCount);

    setCountdownText(formattedTime);
  }, [activeCycleCurrentSeconds, totalCyclesHours, amountSecondsPassed]);

  React.useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(Number(activeCycle?.startDate)),
        );

        setSecondsPassed(secondsDifference);
      }, 1000);
    } else {
      setSecondsPassed(0);
    }

    return () => clearInterval(interval);
  }, [activeCycle, setSecondsPassed, activeCycleTotalSeconds]);

  React.useEffect(() => {
    countdownValue();
  }, [countdownValue]);

  return (
    <CircularProgressbar
      value={percentage}
      text={countdownText}
      styles={buildStyles({
        textColor: percentage <= 0 ? '#EB3B35' : '#5A5A66',
        pathColor: percentage >= 30 ? '#36B336' : '#EB3B35',
        trailColor: percentage <= 0 ? '#EB3B35' : '#E1E3E5',
        textSize: 16,
      })}
      strokeWidth={5}
    />
  );
};
