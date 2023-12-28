import React from 'react';

import {
  ref,
  child,
  get,
  query,
  orderByChild,
  equalTo,
} from 'firebase/database';

import type { JobApiData, JobData } from '~/@types/job';
import { db } from '~/config/firebase';
import { createInitialStateActions } from '~/reducers/jobs/actions';
import { initialJobsState, jobsReducer } from '~/reducers/jobs/reducer';

export const useInitialJobsState = () => {
  const [state, dispatch] = React.useReducer(jobsReducer, initialJobsState);

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

  const createInitialState = React.useCallback(
    async (userId: string) => {
      if (!userId) return;

      const { val: jobsVal } = await snapshotJobs(userId);

      const jobData: JobApiData[] = [];

      if (jobsVal) {
        for (const property in jobsVal) {
          jobData.push({
            ...jobsVal[property],
            id: property,
          });
        }
      }

      const jobs = jobData?.sort((a, b) => {
        return b?.createdAt - a?.createdAt;
      });

      dispatch(createInitialStateActions(jobs));
    },
    [snapshotJobs],
  );

  return { state, dispatch, createInitialState };
};
