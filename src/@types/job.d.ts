import { Cycle } from './cycles';

export type JobStatus = 'opened' | 'developing' | 'done' | 'paused';
export type JobType = 'other' | 'budget' | 'development';

type DateType = number | null;

export interface CreateNewJobData {
  jobberId?: string;
  type: JobType;
  title: string;
  hourEstimate: number;
  minutesEstimate: number;
  totalSecondsAmount: number;
  description?: string;
}

export interface Job {
  id: string | null;
  jobberId?: string;
  userId: string;
  type: JobType;
  title: string;
  description?: string;
  status: JobStatus;
  hourEstimate: number;
  minutesEstimate: number;
  totalSecondsAmount: number;
  totalSecondsRemaining: number;
  createdAt: DateType;
  updatedAt: DateType;
}

export interface JobsContextProps {
  jobs: Job[];
  createNewJob: (data: CreateNewJobData) => void;
  fetchJob: (id: string) => void;
  activeJob: Job | null;
  updateActiveJob: (job: Job) => void;
  newCycle: Cycle | null;
  updateJob: (job: Job) => void;
}

export interface JobsProviderProps {
  children: React.ReactNode;
}
