import React from 'react';

import { differenceInSeconds } from 'date-fns';
import { ref, push, set, ThenableReference } from 'firebase/database';

import type {
  CreateNewCycleJobData,
  Cycle,
  CyclesProviderProps,
  FilteredCycles,
  JobCycles,
  JobCyclesByDate,
} from '~/@types/cycles';
import { JobInfo } from '~/@types/job';
import { db } from '~/config/firebase';
import {
  formatJobCyclesByDate,
  formatTime,
  getJobReports,
  getJobStatus,
  getJobType,
  groupBy,
  secondsToTime,
  getTime,
  uuid,
} from '~/helpers/utils';
import { useAuth } from '~/hooks/useAuth';
import { useCycle } from '~/hooks/useCycle';
import { useInitialCyclesState } from '~/hooks/useInitialCyclesState';
import { useJobsContext } from '~/hooks/useJobsContext';
import {
  addNewCycleJobActions,
  deleteCycleActions,
  finishCurrentCycleActions,
} from '~/reducers/cycles/actions';

import { CyclesContext } from './CyclesContext';

export const CyclesProvider = ({ children }: CyclesProviderProps) => {
  const [jobInfo, setJobInfo] = React.useState<JobInfo>();

  const [countdownText, setCountdownText] = React.useState('00:00:00');
  const [countdownTextActiveCycle, setCountdownTextActiveCycle] =
    React.useState('00:00:00');

  const [jobCycles, setJobCycles] = React.useState<JobCycles[]>([]);

  const { state, dispatch, createInitialState } = useInitialCyclesState();

  const { user } = useAuth();

  const { newCycle, activeJob, updateJob, jobs, updateActiveJob } =
    useJobsContext();

  const {
    formatJobCycles,
    getJobTotalHoursUsed,
    getTotalHoursUsedActiveCycleJob,
    getActiveCycleInfo,
  } = useCycle();

  const { cyclesByUser, activeCycleId } = state;

  const cyclesData: FilteredCycles[] = React.useMemo(() => {
    return cyclesByUser?.map((cycle: Cycle) => {
      const job = jobs?.find((item) => item.id === cycle?.jobId);

      const fineshedDate = cycle?.fineshedDate ?? 0;

      const { time: startDate } = getTime(cycle?.startDate);
      const { time: endDate } = getTime(fineshedDate);

      const totalHours = cycle?.fineshedDate
        ? differenceInSeconds(cycle?.fineshedDate, cycle?.startDate)
        : 0;
      const { hours, minutes } = secondsToTime(totalHours);

      return {
        id: cycle?.id ?? uuid(),
        jobId: cycle?.jobId,
        jobTitle: job?.title ?? '',
        startDate,
        endDate: cycle?.fineshedDate ? endDate : null,
        hours: cycle?.fineshedDate ? `${hours}h:${minutes}m` : '00h:00m',
        totalInSeconds: totalHours,
        createdAt: cycle?.startDate,
        isActive: cycle?.isActive,
      };
    });
  }, [cyclesByUser, jobs]);

  const activeCycle = React.useMemo(() => {
    return cyclesByUser.find((cycle) => cycle.id === activeCycleId);
  }, [activeCycleId, cyclesByUser]);

  const activeCycleJob = React.useMemo(() => {
    const job = jobs?.find((item) => item.id === activeCycle?.jobId);

    return job;
  }, [jobs, activeCycle]);

  const [amountSecondsPassed, setAmountSecondsPassed] = React.useState(() => {
    if (activeCycle?.startDate) {
      return differenceInSeconds(new Date(), new Date(activeCycle?.startDate));
    }

    return 0;
  });

  const cyclesFromActiveCycleJob = cyclesByUser.filter((cycle) => {
    return cycle?.jobId === activeCycle?.jobId;
  });

  const { jobTotalHoursUsed } = getJobTotalHoursUsed(jobCycles);
  const { totalHoursUsedActiveCycleJob } = getTotalHoursUsedActiveCycleJob(
    cyclesFromActiveCycleJob,
  );
  const activeCycleInfo = getActiveCycleInfo(
    activeCycleJob,
    countdownTextActiveCycle,
  );

  const activeCycleTotalSeconds = React.useMemo(() => {
    return activeJob ? activeJob?.totalSecondsRemaining : 0;
  }, [activeJob]);

  const activeCycleCurrentSeconds = React.useMemo(() => {
    return activeCycleTotalSeconds - amountSecondsPassed;
  }, [activeCycleTotalSeconds, amountSecondsPassed]);

  const countdownValue = React.useCallback(() => {
    const isDifec = activeCycle && activeCycle.jobId !== activeJob?.id;

    const amountSeconds = isDifec
      ? jobTotalHoursUsed
      : jobTotalHoursUsed + amountSecondsPassed;

    const currentSeconds = isDifec
      ? activeCycleTotalSeconds
      : activeCycleCurrentSeconds;

    const totalCount =
      activeCycleCurrentSeconds >= 1 ? currentSeconds : amountSeconds;

    const { formattedTime } = secondsToTime(totalCount);

    setCountdownText(formattedTime);
  }, [
    activeCycleCurrentSeconds,
    jobTotalHoursUsed,
    activeCycleTotalSeconds,
    amountSecondsPassed,
    activeCycle,
    activeJob,
  ]);

  const countdownValueActiveCycle = React.useCallback(() => {
    const totalSecondsRemaining = activeCycleJob?.totalSecondsRemaining ?? 0;

    const jobCurrentSeconds = totalSecondsRemaining - amountSecondsPassed;

    const totalCount =
      jobCurrentSeconds >= 1
        ? jobCurrentSeconds
        : totalHoursUsedActiveCycleJob + amountSecondsPassed;

    const { formattedTime } = secondsToTime(totalCount);

    setCountdownTextActiveCycle(formattedTime);
  }, [activeCycleJob, amountSecondsPassed, totalHoursUsedActiveCycleJob]);

  const createNewCycleJob = React.useCallback(
    (data: CreateNewCycleJobData) => {
      if (!user) return;

      const dateInTimestamp = new Date().getTime();

      const cycle: Cycle = {
        id: null,
        jobId: data.jobId,
        userId: user.uid,
        isActive: true,
        startDate: dateInTimestamp,
      };

      const { key }: ThenableReference = push(ref(db, 'cycles'), cycle);

      if (!key) return;

      const newCycleData = {
        ...cycle,
        id: key,
        startDate: dateInTimestamp,
      };

      dispatch(addNewCycleJobActions(newCycleData));
    },
    [user, dispatch],
  );

  const updateCycle = React.useCallback(async (cycle: Cycle) => {
    if (!cycle.id) return;

    const dateInTimestamp = new Date().getTime();

    return set(ref(db, `cycles/${cycle.id}`), {
      ...cycle,
      isActive: false,
      fineshedDate: dateInTimestamp,
    });
  }, []);

  const finishCurrentCycle = React.useCallback(
    (cycle: Cycle) => {
      if (!activeJob) return;

      setAmountSecondsPassed(0);

      updateCycle(cycle);

      updateJob({
        ...activeJob,
        totalSecondsRemaining: activeCycleCurrentSeconds,
      });

      dispatch(finishCurrentCycleActions());
    },
    [updateCycle, updateJob, activeJob, activeCycleCurrentSeconds, dispatch],
  );

  const deleteCycle = React.useCallback(
    (id: string) => {
      dispatch(deleteCycleActions(id));
    },
    [dispatch],
  );

  const getJobInfo = React.useCallback(() => {
    if (activeJob) {
      const activeJobId = activeJob?.id ?? '';

      const listCycles = cyclesByUser.filter((cycle) => {
        return cycle?.jobId === activeJobId;
      });

      const totalSecondsAmount = activeJob?.totalSecondsAmount ?? 0;
      const hourEstimate = activeJob?.hourEstimate ?? 0;
      const minutesEstimate = activeJob?.minutesEstimate ?? 0;
      const { hours, minutes } = secondsToTime(jobTotalHoursUsed);

      const { jobCyclesByDate } = getJobReports(listCycles);

      const { time: createdAt } = getTime(activeJob.createdAt);
      const { time: updatedAt } = getTime(activeJob.updatedAt);

      const info: JobInfo = {
        id: activeJobId,
        jobberId: activeJob?.jobberId,
        title: activeJob.title,
        description: activeJob?.description,
        estimatedTime: formatTime(hourEstimate, minutesEstimate),
        usedTime: {
          time: `${hours}h:${minutes}m`,
          statusColor: jobTotalHoursUsed > totalSecondsAmount ? 'red' : 'gray',
        },
        type: getJobType(activeJob?.type),
        status: getJobStatus(activeJob?.status),
        cyclesByDate: jobCyclesByDate,
        createdAt,
        updatedAt,
      };

      setJobInfo(info);
    }
  }, [activeJob, cyclesByUser, jobTotalHoursUsed]);

  React.useEffect(() => {
    getJobInfo();
  }, [getJobInfo]);

  // Start Countdown
  React.useEffect(() => {
    if (!activeCycle) {
      setAmountSecondsPassed(0);

      return;
    }

    const interval = setInterval(() => {
      const secondsDifference = differenceInSeconds(
        new Date(),
        new Date(activeCycle?.startDate),
      );

      setAmountSecondsPassed(secondsDifference);
    }, 1000);

    return () => clearInterval(interval);
  }, [activeCycle, activeCycleTotalSeconds]);

  // Change Countdown Text
  React.useEffect(() => {
    countdownValue();
  }, [countdownValue]);

  // Countdown Text Active Cycle
  React.useEffect(() => {
    countdownValueActiveCycle();
  }, [countdownValueActiveCycle]);

  // Job Cycles Filtered by Date
  React.useEffect(() => {
    const activeJobId = activeJob?.id ?? '';

    const { cycles } = formatJobCycles(cyclesByUser, activeJobId);

    const groupByDate: JobCyclesByDate = groupBy(cycles, 'date');

    const { data } = formatJobCyclesByDate(groupByDate);

    setJobCycles(data);
  }, [cyclesByUser, activeJob, formatJobCycles]);

  React.useEffect(() => {
    if (newCycle) {
      dispatch(addNewCycleJobActions(newCycle));
    }
  }, [newCycle, dispatch]);

  React.useEffect(() => {
    if (activeCycleJob) {
      updateActiveJob(activeCycleJob);
    }
  }, [activeCycleJob, updateActiveJob]);

  React.useEffect(() => {
    if (!user) return;

    createInitialState(user?.uid);
  }, [createInitialState, user]);

  const values = React.useMemo(
    () => ({
      createNewCycleJob,
      finishCurrentCycle,
      activeCycle,
      activeCycleTotalSeconds,
      activeCycleCurrentSeconds,
      jobTotalHoursUsed,
      jobCycles,
      cyclesByUser,
      cycles: cyclesData,
      countdownText,
      activeCycleInfo,
      jobInfo,
      deleteCycle,
    }),
    [
      createNewCycleJob,
      finishCurrentCycle,
      activeCycle,
      activeCycleTotalSeconds,
      activeCycleCurrentSeconds,
      jobTotalHoursUsed,
      jobCycles,
      cyclesByUser,
      cyclesData,
      countdownText,
      activeCycleInfo,
      jobInfo,
      deleteCycle,
    ],
  );

  return (
    <CyclesContext.Provider value={values}>{children}</CyclesContext.Provider>
  );
};
