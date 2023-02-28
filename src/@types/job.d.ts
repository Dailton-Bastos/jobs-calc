import { Timestamp } from 'firebase/firestore';

export type JobStatus = 'opened' | 'developing' | 'done' | 'paused';
export type JobType = 'other' | 'budget' | 'development';
export type FirestoreTimestamp = Timestamp;

interface CreateNewCycleJobData {
  jobId: string;
  startDate: FirestoreTimestamp;
}

interface Cycle {
  id: string | null;
  jobId: string;
  startDate: FirestoreTimestamp;
  fineshedDate?: FirestoreTimestamp;
}

export interface CreateNewJobData {
  jobberId?: string;
  type: JobType;
  title: string;
  hourEstimate: number;
  minutesEstimate: number;
  totalMinutesAmount: number;
  description?: string;
}

export interface Job {
  id: string | null;
  jobberId?: string;
  userId?: string;
  type: JobType;
  title: string;
  description?: string;
  status: JobStatus;
  hourEstimate: number;
  minutesEstimate: number;
  totalMinutesAmount: number;
  startDate: FirestoreTimestamp | null;
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
}

export interface JobsContextProps {
  jobs: Job[];
  createNewJob: (data: CreateNewJobData) => void;
  fetchJob: (id: string) => void;
  job: Job | null;
  amountSecondsPassed: number;
  setSecondsPassed: (seconds: number) => void;
  cycles: Cycle[];
  createNewCycleJob: (data: CreateNewCycleJobData) => void;
  activeCycle: boolean;
  updateJob: (key: string, data: Job) => void;
}

export interface JobsProviderProps {
  children: React.ReactNode;
}

export interface GetJobResponse {
  job: JobDetail | null;
}

export interface FormattedJobType {
  id: string;
  date: string;
  job_id: string;
  reports: Array<{
    duration: {
      hours: string;
      minutes: string;
    };
    hourEnd: string;
    hourStart: string;
  }>;
  totalHours: number;
  formattedTimer: string;
}

interface Duration {
  duration: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  hourEnd: string;
  hourStart: string;
}

export interface JobReports {
  id: string;
  date: string;
  job_id: string;
  reports: Duration[];
  totalHours: number;
}

export interface JobReport {
  date: string;
  job_id: string;
  report: Duration;
}

export interface GetJobReports {
  reports: JobReport[];
}

export interface JobProgressProps {
  estimateTotalSeconds: number;
  uid: string;
  totalHourJobUsed: number;
}
