import React from 'react';

export type JobStatus = 'opened' | 'running' | 'finished';
export type JobType = 'other' | 'budget' | 'development';

export interface CreateNewJobData {
  // jobberId: number | null;
  type: JobType;
  title: string;
  hourEstimate: number;
  minutesEstimate: number;
  description?: string;
}

export interface Job {
  id: string;
  // type: string;
  // jobberId: number | null;
  type: JobType;
  title: string;
  description?: string;
  status: JobStatus;
  hourEstimate: number;
  minutesEstimate: number;
  // minutesAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

interface JobsContextProps {
  jobs: Job[];
  createNewJob: (data: CreateNewJobData) => void;
  // activeJob: Job | undefined;
  // activeJobId: string | null;
}

export const JobsContext = React.createContext({} as JobsContextProps);
