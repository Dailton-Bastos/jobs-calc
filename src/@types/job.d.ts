import { STATUS_COLORS } from '~/helpers/utils';

import { Cycle } from './cycles';

export type JobStatus = 'opened' | 'developing' | 'done' | 'paused';
export type JobType = 'other' | 'budget' | 'development';

type DateType = number;

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

interface CycleData {
  id: string;
  isActive: boolean;
  startHour: string;
  fineshedHour: string;
  total: string;
  totalCycleInSeconds: number;
  createdAt: string;
}

interface Time {
  title: string;
  label: string;
  dateTime: string;
}

interface CycleDataByCreatedAt {
  id: string;
  time: Time;
  createdAt: string;
}

export interface JobByDate {
  [date: string]: CycleDataByCreatedAt[];
}

interface CyclesByDate extends CycleDataByCreatedAt {
  cycles: CycleData[];
  cycleTotalTime: string;
}

export interface JobInfo {
  id: string;
  jobberId?: string;
  title: string;
  description?: string;
  estimatedTime: string;
  usedTime: {
    time: string;
    statusColor: keyof typeof STATUS_COLORS;
  };
  type: string;
  status: {
    type: string;
    statusColor: keyof typeof STATUS_COLORS;
  };
  cyclesByDate: CyclesByDate[];
  createdAt: Time;
  updatedAt: Time;
}

interface JobResum {
  id: string;
  title: string;
  type: string;
  estimatedTime: string;
  status: {
    type: string;
    statusColor: keyof typeof STATUS_COLORS;
  };
}

interface Highlight extends JobResum {
  usedTime: {
    time: string;
    statusColor: keyof typeof STATUS_COLORS;
  };
}

export interface JobsContextProps {
  jobs: Job[];
  myJobs: JobResum[];
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
