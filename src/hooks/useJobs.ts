import React from 'react';

import { ref, set } from 'firebase/database';

import type { CycleApiData } from '~/@types/cycles';
import type { JobApiData, JobFormatted } from '~/@types/job';
import { db } from '~/config/firebase';
import {
  formatTime,
  getJobStatus,
  getJobType,
  getTime,
  secondsToTime,
  truncateString,
} from '~/helpers/utils';
import { updateJobActions } from '~/reducers/jobs/actions';

import { useCustomToast } from './useCustomToast';
import { useCycle } from './useCycle';
import { useCyclesContext } from './useCyclesContext';
import { useJobsContext } from './useJobsContext';

export const useJobs = () => {
  const { getTotalHoursUsedActiveCycleJob } = useCycle();
  const { jobs } = useCyclesContext();
  const { jobDispatch } = useJobsContext();

  const { customToast } = useCustomToast();

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

  const updateJob = React.useCallback(
    async (job: JobApiData) => {
      if (!job.id) return;

      try {
        const jobData = {
          ...job,
          updatedAt: new Date().getTime(),
        };

        await set(ref(db, `jobs/${job.id}`), jobData);

        jobDispatch(updateJobActions(jobData));

        customToast({
          title: 'Job atualizado',
          description: 'Informações salvas com sucesso.',
          status: 'success',
        });
      } catch (error) {
        customToast({
          title: 'Ocorreu um erro',
          description: 'Tente novamente, por favor.',
          status: 'error',
        });

        throw new Error('Erro to update job');
      }
    },
    [customToast, jobDispatch],
  );

  return { formatJob, getJobById, updateJob };
};
