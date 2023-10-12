import React from 'react';

import {
  ref,
  child,
  get,
  query,
  orderByChild,
  equalTo,
} from 'firebase/database';

import { Cycle } from '~/@types/cycles';
import { Job, IJob } from '~/@types/job';
import { db } from '~/config/firebase';
import {
  formatTime,
  getJobReports,
  getJobStatus,
  getJobType,
  getTime,
  secondsToTime,
  truncateString,
} from '~/helpers/utils';
import { createInitialStateActions } from '~/reducers/jobs/actions';
import { initialJobsState, jobsReducer } from '~/reducers/jobs/reducer';

import { useCycle } from './useCycle';

export const useInitialJobsState = () => {
  const [state, dispatch] = React.useReducer(jobsReducer, initialJobsState);

  const { getTotalHoursUsedActiveCycleJob } = useCycle();

  const snapshotJobs = React.useCallback(async (userId: string) => {
    const snapshot = await get(
      query(child(ref(db), 'jobs'), orderByChild('userId'), equalTo(userId)),
    );

    let val: { [key: string]: Job } = {};

    if (snapshot && snapshot.exists()) {
      val = snapshot.val();
    }

    return { val };
  }, []);

  const snapshotReports = React.useCallback(async (userId: string) => {
    const snapshot = await get(
      query(child(ref(db), 'cycles'), orderByChild('userId'), equalTo(userId)),
    );

    let val: { [key: string]: Cycle } = {};

    if (snapshot && snapshot.exists()) {
      val = snapshot.val();
    }

    return { val };
  }, []);

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

  const createInitialState = React.useCallback(
    async (userId: string) => {
      if (!userId) return;

      const { val: jobsVal } = await snapshotJobs(userId);
      const { val: cyclesVal } = await snapshotReports(userId);

      const jobsList: Job[] = [];
      const jobsData: IJob[] = [];
      const cycles: Cycle[] = [];

      if (cyclesVal) {
        for (const property in cyclesVal) {
          cycles.push({ ...cyclesVal[property] });
        }
      }

      if (jobsVal) {
        for (const property in jobsVal) {
          jobsList.push({ ...jobsVal[property] });

          const {
            id,
            jobberId,
            title,
            description,
            hourEstimate,
            minutesEstimate,
            type,
            status,
            isHighlight,
            createdAt,
            updatedAt,
            totalSecondsAmount,
          } = jobsVal[property];

          const { time: createdAtTime } = getTime(createdAt);
          const { time: updatedAtTime } = getTime(updatedAt);

          const reports = cycles?.filter((cycle) => cycle?.jobId === id);

          const { hours, minutes, totalHoursUsed } =
            getJobTotalHoursUsed(reports);

          const { jobCyclesByDate } = getJobReports(reports);

          const statusColor =
            totalHoursUsed > totalSecondsAmount
              ? ('red' as const)
              : ('green' as const);

          jobsData.push({
            id,
            userId,
            jobberId,
            title: {
              shortName: truncateString(title, 40),
              fullName: title,
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
            briefing: description,
            isHighlight,
            reports: jobCyclesByDate,
            totalSecondsAmount,
            createdAt: {
              timestamp: createdAt,
              ...createdAtTime,
            },
            updatedAt: {
              timestamp: updatedAt,
              ...updatedAtTime,
            },
          });
        }
      }

      const jobs = jobsData?.sort((a, b) => {
        return b?.createdAt?.timestamp - a?.createdAt.timestamp;
      });

      dispatch(createInitialStateActions(jobs, jobsList));
    },
    [snapshotJobs, snapshotReports, getJobTotalHoursUsed],
  );

  return { state, dispatch, createInitialState };
};
