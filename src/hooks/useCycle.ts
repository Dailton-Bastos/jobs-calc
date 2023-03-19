import React from 'react';

import { differenceInSeconds } from 'date-fns';

import { Cycle, FormattedJobCycle, JobCycles } from '~/@types/cycles';
import {
  formatDateWithoutHours,
  formatHour,
  secondsToTime,
} from '~/helpers/utils';

export const useCycle = () => {
  const formatJobCycles = React.useCallback(
    (cyclesByUser: Cycle[], activeJobId: string) => {
      const cycles = cyclesByUser
        .filter((cycle) => {
          return cycle?.jobId === activeJobId;
        })
        .reduce((accumulator: FormattedJobCycle[], currentValue: Cycle) => {
          const fineshedDate = currentValue?.fineshedDate
            ? formatHour(currentValue.fineshedDate)
            : '';

          const totalCycleInSeconds = currentValue?.fineshedDate
            ? differenceInSeconds(
                new Date(currentValue.fineshedDate),
                new Date(currentValue.startDate),
              )
            : 0;

          const { hours, minutes, seconds } =
            secondsToTime(totalCycleInSeconds);

          const totalCycle = `${hours}h:${minutes}m:${seconds}s`;

          const cycle: FormattedJobCycle = {
            id: currentValue.id,
            date: formatDateWithoutHours(currentValue.startDate),
            startDate: formatHour(currentValue.startDate),
            fineshedDate,
            totalCycle,
            totalCycleInSeconds,
            isActive: currentValue?.fineshedDate ? false : true,
          };

          accumulator.push(cycle);

          return accumulator;
        }, []);

      return { cycles };
    },
    [],
  );

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
    (cycles: Cycle[]) => {
      const totalHoursUsedActiveCycleJob = cycles.reduce(
        (accumulator: number, currentValue: Cycle) => {
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
    formatJobCycles,
    getJobTotalHoursUsed,
    getTotalHoursUsedActiveCycleJob,
  };
};
