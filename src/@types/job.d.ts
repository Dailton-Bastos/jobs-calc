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

export interface JobsContextProps {
  jobsData: JobApiData[];
  data: JobApiData[];
  jobDispatch: (value: JobActions) => void;
  deleteJob: (id: string) => void;
  orderBy: (orderBy: OrderBy) => void;
  selectedOrder: string;
  handleSelectedOrder: (value: string) => void;
}

export interface JobsProviderProps {
  children: React.ReactNode;
}
