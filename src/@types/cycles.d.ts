import { Timestamp } from 'firebase/firestore';

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
  startDate: Timestamp | number;
  fineshedDate?: Timestamp;
}

export interface CyclesContextData {
  cycles: Cycle[];
  createNewCycleJob: (data: CreateNewCycleJobData) => void;
}

export interface CyclesState {
  cycles: Cycle[];
  isActive: boolean;
}
