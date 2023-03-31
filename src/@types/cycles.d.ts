import { JobInfo } from './job';

export interface CyclesProviderProps {
  children: React.ReactNode;
}

export interface CreateNewCycleJobData {
  jobId: string;
}

export interface Cycle {
  id: string | null;
  jobId: string;
  userId: string;
  isActive: boolean;
  startDate: number;
  fineshedDate?: number;
}

interface FormattedJobCycle {
  id: string | null;
  date: string;
  startDate: string;
  fineshedDate: string;
  totalCycle: string;
  totalCycleInSeconds: number;
  isActive: boolean;
}

interface JobCycles {
  id: string | null;
  date: string;
  totalHoursByDate: string;
  totalCycleInSeconds: number;
  cycles: Array<{
    id: string;
    startDate: string;
    fineshedDate: string;
    totalCycle: string;
    isActive: boolean;
  }>;
}

export interface JobCyclesByDate {
  [date: string]: FormattedJobCycle[];
}

export interface ActiveCycleInfo {
  jobId: string;
  title: string;
  countdown: string;
  highlight: boolean;
}

interface Time {
  title: string;
  label: string;
  dateTime: string;
}

interface FilteredCycles {
  id: string;
  jobId: string;
  jobTitle: string;
  createdAt: number;
  isActive: boolean;
  hours: string;
  totalInSeconds: number;
  startDate: Time;
  endDate: Time | null;
}

export interface CyclesContextData {
  activeCycle: Cycle | undefined;
  createNewCycleJob: (data: CreateNewCycleJobData) => void;
  activeCycleCurrentSeconds: number;
  activeCycleTotalSeconds: number;
  finishCurrentCycle: (cycle: Cycle) => void;
  jobTotalHoursUsed: number;
  jobCycles: JobCycles[];
  cycles: FilteredCycles[];
  cyclesByUser: Cycle[];
  countdownText: string;
  activeCycleInfo: ActiveCycleInfo | null;
  jobInfo: JobInfo | undefined;
}

export interface CyclesState {
  cyclesByUser: Cycle[];
  activeCycleId: string | null;
}
