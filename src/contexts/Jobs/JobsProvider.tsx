import React from 'react';

import { ref, push } from 'firebase/database';
import type { DatabaseReference } from 'firebase/database';
import { Timestamp } from 'firebase/firestore';

import { db, serverTimestamp } from '~/config/firebase';
import { uuid } from '~/helpers/utils';
import { useAuth } from '~/hooks/useAuth';

import { JobsContext } from './JobsContext';
import type { CreateNewJobData, Job } from './JobsContext';

interface JobsProviderProps {
  children: React.ReactNode;
}

type FirestoreTimestamp = Timestamp;

export const JobsProvider = ({ children }: JobsProviderProps) => {
  const [jobs, setJobs] = React.useState<Job[]>([]);

  const { user } = useAuth();

  const createNewJob = React.useCallback(
    async (data: CreateNewJobData) => {
      const newJob: Job = {
        id: uuid(),
        jobberId: data.jobberId,
        userId: user?.uid,
        type: data.type,
        title: data.title,
        status: 'opened',
        hourEstimate: data.hourEstimate,
        minutesEstimate: data.minutesEstimate,
        description: data.description,
        // startDate: new Date(),
        createdAt: serverTimestamp() as FirestoreTimestamp,
        updatedAt: serverTimestamp() as FirestoreTimestamp,
      };

      const reference: DatabaseReference = await push(ref(db, 'jobs'), newJob);

      if (reference) {
        setJobs((prevState) => [newJob, ...prevState]);
      }
    },
    [user],
  );

  return (
    <JobsContext.Provider value={{ jobs, createNewJob }}>
      {children}
    </JobsContext.Provider>
  );
};
