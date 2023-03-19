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

export interface CyclesContextData {
  cyclesByUser: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  createNewCycleJob: (data: CreateNewCycleJobData) => void;
  amountSecondsPassed: number;
  activeCycleCurrentSeconds: number;
  activeCycleTotalSeconds: number;
  finishCurrentCycle: (cycle: Cycle) => void;
  jobTotalHoursUsed: number;
  jobCycles: JobCycles[];
  countdownText: string;
  activeCycleInfo: ActiveCycleInfo | null;
}

export interface CyclesState {
  cyclesByUser: Cycle[];
  activeCycleId: string | null;
}
