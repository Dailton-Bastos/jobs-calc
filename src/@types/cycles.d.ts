import { CycleActions } from '~/reducers/cycles/actions';

import { JobFormatted } from './job';

interface CycleCommon {
  jobId: string;
  isActive: boolean;
  description?: string;
}

export interface CycleApiData extends CycleCommon {
  id: string;
  userId: string;
  startDate: number;
  fineshedDate?: number;
}

export interface CycleFormatted extends CycleCommon {
  id: string;
  startHour: string;
  finishedHour: string;
  total: string;
}

export interface CyclesProviderProps {
  children: React.ReactNode;
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

export interface CyclesContextData {
  cyclesData: CycleApiData[];
  jobs: JobFormatted[];
  cycleDispatch: (value: CycleActions) => void;
  activeCycle: CycleApiData | null;
  activeJob: JobFormatted | null;
  updateCycle: (cycle: CycleApiData) => void;
  deleteCycle: (id: string) => void;
}
