import React from 'react';

import type { Cycle } from '~/@types/cycles';
import type { JobApiData, JobFormatted } from '~/@types/job';
import {
  formatTime,
  getJobStatus,
  getJobType,
  getTime,
  secondsToTime,
  truncateString,
  // getJobReports,
} from '~/helpers/utils';

import { useCycle } from './useCycle';

export const useJobs = () => {
  const { getTotalHoursUsedActiveCycleJob } = useCycle();

  const getJobTotalHoursUsed = React.useCallback(
    (cycles: Cycle[]) => {
      const { totalHoursUsedActiveCycleJob } =
        getTotalHoursUsedActiveCycleJob(cycles);

      const totalHoursUsed = totalHoursUsedActiveCycleJob;

      const { hours, minutes } = secondsToTime(totalHoursUsed);

      return { hours, minutes, totalHoursUsed };
    },
    [getTotalHoursUsedActiveCycleJob],
  );

  const formatJob = React.useCallback(
    (data: JobApiData, cycles: Cycle[]): JobFormatted => {
      const {
        id,
        title,
        hourEstimate,
        minutesEstimate,
        type,
        status,
        createdAt,
        updatedAt,
        totalSecondsAmount,
      } = data;

      const { time: createdAtTime } = getTime(createdAt);
      const { time: updatedAtTime } = getTime(updatedAt);

      const reports = cycles?.filter((cycle) => cycle?.jobId === id);

      const { hours, minutes, totalHoursUsed } = getJobTotalHoursUsed(reports);

      // const { jobCyclesByDate } = getJobReports(reports);

      const statusColor =
        totalHoursUsed > totalSecondsAmount
          ? ('red' as const)
          : ('green' as const);

      return {
        ...data,
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
        // reports: jobCyclesByDate,
        reports: [],
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

  return { formatJob };
};
