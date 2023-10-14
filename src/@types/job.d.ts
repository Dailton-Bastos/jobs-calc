import { ToastId, UseToastOptions } from '@chakra-ui/react';

import { STATUS_COLORS } from '~/helpers/utils';

import { CycleFormatted } from './cycles';

export type JobStatus = 'opened' | 'developing' | 'done' | 'paused';
export type JobType = 'other' | 'budget' | 'development';

type DateType = number;

interface Date {
  title: string;
  label: string;
  datetime: string;
  timestamp: number;
}

interface ReportCommon {
  id: string;
  jobId: string;
  date: Date;
}

export interface FormattedReportCommon extends ReportCommon {
  startDate: number;
  fineshedDate?: number;
  isActive: boolean;
}

interface Report extends ReportCommon {
  cycles: CycleFormatted[];
  totalUsedTime: string;
}

interface JobCommon {
  userId: string;
  jobberId?: string;
  description?: string;
  isHighlight: boolean;
  totalSecondsAmount: number;
  totalSecondsRemaining: number;
}

export interface JobFormatted extends JobCommon {
  id: string;
  title: {
    shortTitle: string;
    fullTitle: string;
  };
  estimatedTime: {
    hours: number;
    minutes: number;
    total: string;
  };
  usedTime: {
    hours: string;
    minutes: string;
    total: string;
    statusColor: keyof typeof STATUS_COLORS;
  };
  type: string;
  status: {
    type: JobStatus;
    title: string;
    statusColor: keyof typeof STATUS_COLORS;
  };
  reports: Report[];
  createdAt: Date;
  updatedAt: Date;
}

interface JobData extends JobCommon {
  type: JobType;
  status: JobStatus;
  title: string;
  hourEstimate: number;
  minutesEstimate: number;
  createdAt: number;
  updatedAt: number;
}

interface JobApiData extends JobData {
  id: string;
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
  isHighlight?: boolean;
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
  datetime: string;
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

export interface JobsContextProps {
  jobs: JobFormatted[];
  createNewJob: (data: JobData) => void;
  fetchJob: (id: string) => void;
  activeJob: JobFormatted | null;
  updateActiveJob: (job: JobFormatted) => void;
  // newCycle: CycleData | null;
  updateJob: (job: Job) => void;
  deleteJob: (id: string) => void;
  showToast: (options: UseToastOptions) => ToastId | undefined;
}

export interface JobsProviderProps {
  children: React.ReactNode;
}
