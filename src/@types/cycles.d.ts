export interface CyclesProviderProps {
  children: React.ReactNode;
}

export interface CreateNewCycleJobData {
  userId: string;
  jobId: string;
  startDate: FirestoreTimestamp;
}

export interface Cycle {
  id: string | null;
  jobId: string;
  userId: string;
  startDate: FirestoreTimestamp;
  fineshedDate?: FirestoreTimestamp;
}

export interface CyclesContextData {
  cycles: Cycle[];
  createNewCycleJob: (data: CreateNewCycleJobData) => void;
}

export interface CyclesState {
  cycles: Cycle[];
}
