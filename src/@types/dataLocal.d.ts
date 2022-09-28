export interface AppLocalData {
  jobs: {
    [key: string]: {
      timeLeft: number;
      startOfHour: Date | null;
    };
  };
}
