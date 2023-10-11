import React from 'react';

import {
  ref,
  child,
  get,
  query,
  orderByChild,
  equalTo,
} from 'firebase/database';

import { Job, IJob } from '~/@types/job';
import { db } from '~/config/firebase';
import {
  formatTime,
  getJobStatus,
  getJobType,
  getTime,
  truncateString,
} from '~/helpers/utils';
import { createInitialStateActions } from '~/reducers/jobs/actions';
import { initialJobsState, jobsReducer } from '~/reducers/jobs/reducer';

export const useInitialJobsState = () => {
  const [state, dispatch] = React.useReducer(jobsReducer, initialJobsState);

  const createInitialState = React.useCallback(async (userId: string) => {
    if (!userId) return;

    const snapshot = await get(
      query(child(ref(db), 'jobs'), orderByChild('userId'), equalTo(userId)),
    );

    const jobsList: Job[] = [];
    const jobData: IJob[] = [];

    if (snapshot && snapshot.exists()) {
      const val: { [key: string]: Job } = snapshot.val();

      for (const property in val) {
        jobsList.push({ ...val[property] });

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
        } = val[property];

        const { time: createdAtTime } = getTime(createdAt);
        const { time: updatedAtTime } = getTime(updatedAt);

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
  }, []);

  return { state, dispatch, createInitialState };
};
