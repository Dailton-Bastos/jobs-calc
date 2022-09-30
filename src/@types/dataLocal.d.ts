export interface AppLocalData {
  jobs: {
    [key: string]: {
      timeLeft: number;
      totalTimeUsed: number;
      startOfHour: Date | null;
      endOfHour: Date | null;
    };
  };
}
