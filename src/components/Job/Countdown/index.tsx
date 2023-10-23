import React from 'react';

import { Flex } from '@chakra-ui/react';
import { differenceInSeconds } from 'date-fns';

import 'react-circular-progressbar/dist/styles.css';
import { JobFormatted } from '~/@types/job';
import { secondsToTime } from '~/helpers/utils';
import { useCyclesContext } from '~/hooks/useCyclesContext';
import { useJobsContext } from '~/hooks/useJobsContext';

import { Control } from './components/Control';
import { Timer } from './components/Timer';

type Props = {
  job: JobFormatted;
};

export const Countdown = ({ job }: Props) => {
  const [countdownText, setCountdownText] = React.useState({
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  const { jobsData } = useJobsContext();
  const { activeCycle, activeJob } = useCyclesContext();

  const [amountSecondsPassed, setAmountSecondsPassed] = React.useState(() => {
    if (activeCycle?.startDate) {
      return differenceInSeconds(new Date(), new Date(activeCycle?.startDate));
    }

    return 0;
  });

  const jobApiData = React.useMemo(() => {
    return jobsData.find((item) => item.id === job.id);
  }, [jobsData, job]);

  const {
    totalSecondsAmount,
    usedTime: { totalUsed },
  } = job;

  const isActiveJob = Boolean(activeJob && activeJob.id === job.id);

  const totalSecondsRemaining = totalSecondsAmount - totalUsed;

  const currentTime = isActiveJob
    ? totalSecondsRemaining - amountSecondsPassed
    : totalSecondsRemaining;

  const countdownValue = React.useCallback(() => {
    const amountSeconds = isActiveJob
      ? totalUsed + amountSecondsPassed
      : totalUsed;

    const totalCount = currentTime >= 1 ? currentTime : amountSeconds;

    const { hours, minutes, seconds } = secondsToTime(totalCount);

    setCountdownText({
      hours,
      minutes,
      seconds,
    });
  }, [amountSecondsPassed, currentTime, totalUsed, isActiveJob]);

  const percentage = Math.ceil((currentTime / totalSecondsAmount) * 100);

  // Start Countdown
  React.useEffect(() => {
    if (!activeCycle) {
      setAmountSecondsPassed(0);

      return;
    }

    const interval = setInterval(() => {
      const secondsDifference = differenceInSeconds(
        new Date(),
        new Date(activeCycle.startDate),
      );

      setAmountSecondsPassed(secondsDifference);
    }, 1000);

    return () => clearInterval(interval);
  }, [activeCycle]);

  React.useEffect(() => {
    countdownValue();
  }, [countdownValue]);

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      w="100%"
      maxW="352px"
    >
      <Timer percentage={percentage} countdownText={countdownText} />

      {jobApiData && (
        <Control jobApiData={jobApiData} isActiveJob={isActiveJob} />
      )}
    </Flex>
  );
};
