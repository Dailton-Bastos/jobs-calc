import { Timestamp } from 'firebase/firestore';

export type FirestoreTimestamp = Timestamp;

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

interface FilteredCycle {
  id: string | null;
  date: string;
  startDate: string;
  fineshedDate: string;
  totalCycle: string;
  totalCycleInSeconds: number;
  isActive: boolean;
}

interface CycleByDate {
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

export interface GroupByDate {
  [date: string]: FilteredCycle[];
}

export interface CyclesContextData {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  createNewCycleJob: (data: CreateNewCycleJobData) => void;
  amountSecondsPassed: number;
  setSecondsPassed: (seconds: number) => void;
  activeCycleCurrentSeconds: number;
  activeCycleTotalSeconds: number;
  finishCurrentCycle: (cycle: Cycle) => void;
  filteredCycles: FilteredCycle[];
  formatCyclesByDate: (groupByDate: GroupByDate) => { cycles: CycleByDate[] };
}

export interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}
