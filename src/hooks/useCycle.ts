import React from 'react';

import { differenceInSeconds } from 'date-fns';

import type { JobCycles, CycleApiData } from '~/@types/cycles';

export const useCycle = () => {
  const getJobTotalHoursUsed = React.useCallback((jobCycles: JobCycles[]) => {
    const jobTotalHoursUsed = jobCycles?.reduce(
      (acc: number, cycle: JobCycles) => {
        acc += cycle?.totalCycleInSeconds;

        return acc;
      },
      0,
    );

    return { jobTotalHoursUsed };
  }, []);

  const getTotalHoursUsedActiveCycleJob = React.useCallback(
    (cycles: CycleApiData[]) => {
      const totalHoursUsedActiveCycleJob = cycles.reduce(
        (accumulator: number, currentValue: CycleApiData) => {
          const totalCycleInSeconds = currentValue?.fineshedDate
            ? differenceInSeconds(
                new Date(currentValue.fineshedDate),
                new Date(currentValue.startDate),
              )
            : 0;

          accumulator += totalCycleInSeconds;

          return accumulator;
        },
        0,
      );

      return { totalHoursUsedActiveCycleJob };
    },
    [],
  );

  return {
    getJobTotalHoursUsed,
    getTotalHoursUsedActiveCycleJob,
  };
};
