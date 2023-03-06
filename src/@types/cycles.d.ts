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
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  createNewCycleJob: (data: CreateNewCycleJobData) => void;
  amountSecondsPassed: number;
  setSecondsPassed: (seconds: number) => void;
  finishCurrentCycle: (cycle: Cycle) => void;
}

export interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}
