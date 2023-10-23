import React from 'react';

import type { CyclesProviderProps } from '~/@types/cycles';
import { useAuth } from '~/hooks/useAuth';
import { useInitialCyclesState } from '~/hooks/useInitialCyclesState';
import { useJobs } from '~/hooks/useJobs';
import { useJobsContext } from '~/hooks/useJobsContext';

import { CyclesContext } from './CyclesContext';

export const CyclesProvider = ({ children }: CyclesProviderProps) => {
  const { state, dispatch, createInitialState } = useInitialCyclesState();

  const { cyclesData, activeCycle } = state;

  const { user } = useAuth();
  const { formatJob } = useJobs();

  const { jobsData } = useJobsContext();

  const jobs = React.useMemo(() => {
    return jobsData.map((job) => {
      const cycles = cyclesData?.filter((cycle) => cycle?.jobId === job.id);

      return formatJob(job, cycles);
    });
  }, [jobsData, formatJob, cyclesData]);

  const activeJob = React.useMemo(() => {
    const job = jobsData.find((item) => item.id === activeCycle?.jobId);

    if (!job) return null;

    const cycles = cyclesData?.filter((cycle) => cycle?.jobId === job.id);

    return formatJob(job, cycles);
  }, [jobsData, activeCycle, cyclesData, formatJob]);

  React.useEffect(() => {
    if (!user) return;

    createInitialState(user?.uid);
  }, [createInitialState, user]);

  const values = React.useMemo(
    () => ({
      cyclesData,
      jobs,
      cycleDispatch: dispatch,
      activeCycle,
      activeJob,
    }),
    [cyclesData, jobs, dispatch, activeCycle, activeJob],
  );

  return (
    <CyclesContext.Provider value={values}>{children}</CyclesContext.Provider>
  );
};
