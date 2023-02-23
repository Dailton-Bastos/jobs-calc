import React from 'react';

import { uuid } from '~/helpers/utils';

import { JobsContext } from './JobsContext';
import type { CreateNewJobData, Job } from './JobsContext';

interface JobsProviderProps {
  children: React.ReactNode;
}

export const JobsProvider = ({ children }: JobsProviderProps) => {
  const [jobs, setJobs] = React.useState<Job[]>([]);

  const createNewJob = React.useCallback((data: CreateNewJobData) => {
    const newJob: Job = {
      id: uuid(),
      // type: 'other',
      // jobberId: null,
      type: data.type,
      title: data.title,
      status: 'opened',
      hourEstimate: data.hourEstimate,
      minutesEstimate: data.minutesEstimate,
      // minutesAmount: 30,
      description: data.description,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setJobs((prevState) => [newJob, ...prevState]);
  }, []);

  return (
    <JobsContext.Provider value={{ jobs, createNewJob }}>
      {children}
    </JobsContext.Provider>
  );
};
