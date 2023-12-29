// import { ToastId, UseToastOptions } from '@chakra-ui/react';

import { STATUS_COLORS } from '~/helpers/utils';
import { JobActions } from '~/reducers/jobs/actions';

import { CycleFormatted } from './cycles';

export type JobStatus = 'opened' | 'developing' | 'done' | 'paused';
export type JobType = 'other' | 'budget' | 'development';
export type OrderBy =
  | 'opened'
  | 'developing'
  | 'done'
  | 'paused'
  | 'other'
  | 'budget'
  | 'development'
  | 'all';

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
    totalUsed: number;
    statusColor: keyof typeof STATUS_COLORS;
  };
  type: string;
  status: {
    type: JobStatus;
    title: string;
    statusColor: keyof typeof STATUS_COLORS;
  };
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
  jobsData: JobApiData[];
  data: JobApiData[];
  jobDispatch: (value: JobActions) => void;
  // cyclesData: CycleApiData[];
  // createNewJob: (data: JobData) => void;
  // fetchJob: (id: string) => void;
  // activeJob: JobFormatted | undefined;
  // updateActiveJob: (job: JobFormatted) => void;
  // newCycle: CycleData | null;
  // updateJob: (job: Job) => void;
  deleteJob: (id: string) => void;
  orderBy: (orderBy: OrderBy) => void;
  selectedOrder: string;
  handleSelectedOrder: (value: string) => void;
  // showToast: (options: UseToastOptions) => ToastId | undefined;
}

export interface JobsProviderProps {
  children: React.ReactNode;
}
