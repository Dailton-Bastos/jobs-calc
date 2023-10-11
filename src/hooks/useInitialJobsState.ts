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
  truncateString,
} from '~/helpers/utils';
import { createInitialStateActions } from '~/reducers/jobs/actions';
import { initialJobsState, jobsReducer } from '~/reducers/jobs/reducer';

export const useInitialJobsState = () => {
  const [state, dispatch] = React.useReducer(jobsReducer, initialJobsState);

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

  const createInitialState = React.useCallback(
    async (userId: string) => {
      if (!userId) return;

      const { val: jobsVal } = await snapshotJobs(userId);
      const { val: cyclesVal } = await snapshotReports(userId);

      const jobsList: Job[] = [];
      const jobData: IJob[] = [];
      const cycles: Cycle[] = [];
      const cyclesByJob: Cycle[] = [];

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
          } = jobsVal[property];

          const { time: createdAtTime } = getTime(createdAt);
          const { time: updatedAtTime } = getTime(updatedAt);

          const cycleByJob = cycles?.find((cycle) => cycle?.jobId === id);

          if (cycleByJob) {
            cyclesByJob.push(cycleByJob);
          }

          const { jobCyclesByDate } = getJobReports(cyclesByJob);

          jobData.push({
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
              hours: 1,
              minutes: 5,
              total: '01h:04m',
              statusColor: 'red',
            },
            type: getJobType(type),
            status: getJobStatus(status),
            briefing: description,
            isHighlight,
            reports: jobCyclesByDate,
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

      dispatch(createInitialStateActions(jobData, jobsList));
    },
    [snapshotJobs, snapshotReports],
  );

  return { state, dispatch, createInitialState };
};
