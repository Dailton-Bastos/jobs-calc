import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import { differenceInSeconds } from 'date-fns';

import 'react-circular-progressbar/dist/styles.css';
import { secondsToTime } from '~/helpers/utils';
import { useCyclesContext } from '~/hooks/useCyclesContext';

export const Countdown = () => {
  const {
    activeCycle,
    activeCycleTotalSeconds,
    activeCycleCurrentSeconds,
    setSecondsPassed,
  } = useCyclesContext();

  const { formattedTime } = secondsToTime(activeCycleCurrentSeconds);

  const percentage = Math.round(
    (activeCycleCurrentSeconds / activeCycleTotalSeconds) * 100,
  );

  React.useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(Number(activeCycle?.startDate)),
        );

        if (secondsDifference >= activeCycleTotalSeconds) {
          setSecondsPassed(activeCycleTotalSeconds);

          return clearInterval(interval);
        }

        setSecondsPassed(secondsDifference);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [activeCycle, setSecondsPassed, activeCycleTotalSeconds]);

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
