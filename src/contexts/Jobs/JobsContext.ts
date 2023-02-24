import React from 'react';

import { Timestamp } from 'firebase/firestore';

export type JobStatus = 'opened' | 'running' | 'finished';
export type JobType = 'other' | 'budget' | 'development';

type FirestoreTimestamp = Timestamp;

export interface CreateNewJobData {
  jobberId?: string;
  type: JobType;
  title: string;
  hourEstimate: number;
  minutesEstimate: number;
  description?: string;
}

export interface Job {
  id: string;
  jobberId?: string;
  userId?: string;
  type: JobType;
  title: string;
  description?: string;
  status: JobStatus;
  hourEstimate: number;
  minutesEstimate: number;
  // minutesAmount: number;
  // startDate: Date;
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
}

interface JobsContextProps {
  jobs: Job[];
  createNewJob: (data: CreateNewJobData) => void;
  // activeJob: Job | undefined;
  // activeJobId: string | null;
}

export const JobsContext = React.createContext({} as JobsContextProps);
