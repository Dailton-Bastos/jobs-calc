import React from 'react';

import type { CycleApiData } from '~/@types/cycles';
import type { JobApiData, JobFormatted } from '~/@types/job';
import {
  formatTime,
  getJobStatus,
  getJobType,
  getTime,
  secondsToTime,
  truncateString,
} from '~/helpers/utils';

import { useCycle } from './useCycle';
import { useCyclesContext } from './useCyclesContext';

export const useJobs = () => {
  const { getTotalHoursUsedActiveCycleJob } = useCycle();
  const { jobs } = useCyclesContext();

  const getJobTotalHoursUsed = React.useCallback(
    (cycles: CycleApiData[]) => {
      const { totalHoursUsedActiveCycleJob } =
        getTotalHoursUsedActiveCycleJob(cycles);

      const totalHoursUsed = totalHoursUsedActiveCycleJob;

      const { hours, minutes } = secondsToTime(totalHoursUsed);

      return { hours, minutes, totalHoursUsed };
    },
    [getTotalHoursUsedActiveCycleJob],
  );

  const formatJob = React.useCallback(
    (job: JobApiData, cycles: CycleApiData[]): JobFormatted => {
      const {
        title,
        hourEstimate,
        minutesEstimate,
        type,
        status,
        createdAt,
        updatedAt,
        totalSecondsAmount,
      } = job;

      const { time: createdAtTime } = getTime(createdAt);
      const { time: updatedAtTime } = getTime(updatedAt);

      const { hours, minutes, totalHoursUsed } = getJobTotalHoursUsed(cycles);

      const statusColor =
        totalHoursUsed > totalSecondsAmount
          ? ('red' as const)
          : ('green' as const);

      return {
        ...job,
        title: {
          shortTitle: truncateString(title, 40),
          fullTitle: title,
        },
        estimatedTime: {
          hours: hourEstimate,
          minutes: minutesEstimate,
          total: formatTime(hourEstimate, minutesEstimate),
        },
        usedTime: {
          hours,
          minutes,
          total: `${hours}h:${minutes}m`,
          statusColor,
        },
        type: getJobType(type),
        status: getJobStatus(status),
        createdAt: {
          timestamp: createdAt,
          ...createdAtTime,
        },
        updatedAt: {
          timestamp: updatedAt,
          ...updatedAtTime,
        },
      };
    },
    [getJobTotalHoursUsed],
  );

  const getJobById = React.useCallback(
    (id: string | undefined) => {
      if (!id) return;

      return jobs?.find((job) => job?.id === id);
    },
    [jobs],
  );

  return { formatJob, getJobById };
};
