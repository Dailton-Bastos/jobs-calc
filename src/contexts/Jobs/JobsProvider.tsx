import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  ref,
  push,
  child,
  get,
  query,
  orderByChild,
  equalTo,
} from 'firebase/database';
import type { DatabaseReference } from 'firebase/database';

import {
  CreateNewJobData,
  FirestoreTimestamp,
  Job,
  JobType,
  JobsProviderProps,
} from '~/@types/job';
import { db, serverTimestamp } from '~/config/firebase';
import { uuid } from '~/helpers/utils';
import { useAuth } from '~/hooks/useAuth';
import {
  addNewJobActions,
  createInitialStateActions,
} from '~/reducers/jobs/actions';
import { initialJobsState, jobsReducer } from '~/reducers/jobs/reducer';

import { JobsContext } from './JobsContext';

export const JobsProvider = ({ children }: JobsProviderProps) => {
  const [jobsState, dispatch] = React.useReducer(jobsReducer, initialJobsState);

  const { user } = useAuth();
  const userId = user?.uid;

  const { jobs } = jobsState;

  const navigate = useNavigate();

  const createNewJob = React.useCallback(
    async (data: CreateNewJobData) => {
      const newJob: Job = {
        id: uuid(),
        jobberId: data.jobberId,
        userId: user?.uid,
        type: data.type as JobType,
        title: data.title,
        status: 'opened',
        hourEstimate: data.hourEstimate,
        minutesEstimate: data.minutesEstimate,
        description: data.description,
        createdAt: serverTimestamp() as FirestoreTimestamp,
        updatedAt: serverTimestamp() as FirestoreTimestamp,
      };

      const reference: DatabaseReference = await push(ref(db, 'jobs'), newJob);

      if (reference) {
        dispatch(addNewJobActions(newJob));

        navigate(`/jobs/${newJob.id}`);
      }
    },
    [user, navigate],
  );

  const createInitialState = React.useCallback(async () => {
    if (!userId) return;

    const snapshot = await get(
      query(child(ref(db), 'jobs'), orderByChild('userId'), equalTo(userId)),
    );

    const jobsList: Job[] = [];

    if (snapshot && snapshot.exists()) {
      const data = snapshot.val();

      for (const id in data) {
        jobsList.push({ id, ...data[id] });
      }
    }

    dispatch(createInitialStateActions(jobsList));
  }, [userId]);

  React.useEffect(() => {
    createInitialState();
  }, [createInitialState]);

  return (
    <JobsContext.Provider value={{ jobs, createNewJob }}>
      {children}
    </JobsContext.Provider>
  );
};
