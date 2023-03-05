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
  startDate: FirestoreTimestamp | number;
  fineshedDate?: FirestoreTimestamp | number;
}

export interface CyclesContextData {
  cycles: Cycle[];
  createNewCycleJob: (data: CreateNewCycleJobData) => void;
  finishCurrentCycle: (cycle: Cycle) => void;
  activeCycle: Cycle | null;
}

export interface CyclesState {
  cycles: Cycle[];
  activeCycle: Cycle | null;
}
