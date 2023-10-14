import React from 'react';

import {
  ref,
  child,
  get,
  query,
  orderByChild,
  equalTo,
} from 'firebase/database';

import { CycleApiData } from '~/@types/cycles';
import type { JobData, JobFormatted } from '~/@types/job';
import { db } from '~/config/firebase';
import { createInitialStateActions } from '~/reducers/jobs/actions';
import { initialJobsState, jobsReducer } from '~/reducers/jobs/reducer';

import { useJobs } from './useJobs';

export const useInitialJobsState = () => {
  const [state, dispatch] = React.useReducer(jobsReducer, initialJobsState);

  const { formatJob } = useJobs();

  const snapshotJobs = React.useCallback(async (userId: string) => {
    const snapshot = await get(
      query(child(ref(db), 'jobs'), orderByChild('userId'), equalTo(userId)),
    );

    let val: { [key: string]: JobData } = {};

    if (snapshot && snapshot.exists()) {
      val = snapshot.val();
    }

    return { val };
  }, []);

  const snapshotReports = React.useCallback(async (userId: string) => {
    const snapshot = await get(
      query(child(ref(db), 'cycles'), orderByChild('userId'), equalTo(userId)),
    );

    let val: { [key: string]: CycleApiData } = {};

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

      const jobData: JobFormatted[] = [];
      const cyclesData: CycleApiData[] = [];

      if (cyclesVal) {
        for (const property in cyclesVal) {
          cyclesData.push({ ...cyclesVal[property] });
        }
      }

      if (jobsVal) {
        for (const property in jobsVal) {
          const id = property;

          const job = {
            id,
            ...jobsVal[property],
          };

          const cycles = cyclesData?.filter((cycle) => cycle?.jobId === id);

          const formattedJob = formatJob(job, cycles);

          jobData.push(formattedJob);
        }
      }

      const jobs = jobData?.sort((a, b) => {
        return b?.createdAt?.timestamp - a?.createdAt.timestamp;
      });

      dispatch(createInitialStateActions(jobs));
    },
    [snapshotJobs, snapshotReports, formatJob],
  );

  return { state, dispatch, createInitialState };
};
