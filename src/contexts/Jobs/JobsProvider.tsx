import React from 'react';
// import { useNavigate } from 'react-router-dom';

// import { ref, push, set, onValue, ThenableReference } from 'firebase/database';

// import { Cycle } from '~/@types/cycles';
import type {
  JobsProviderProps,
  OrderBy,
  // JobData,
  // JobFormatted,
  // Job,
} from '~/@types/job';
// import { db } from '~/config/firebase';
import { useAuth } from '~/hooks/useAuth';
import { useInitialJobsState } from '~/hooks/useInitialJobsState';
// import { useJobs } from '~/hooks/useJobs';
import { deleteJobActions, orderByJobActions } from '~/reducers/jobs/actions';

import { JobsContext } from './JobsContext';

export const JobsProvider = ({ children }: JobsProviderProps) => {
  const [selectedOrder, setSelectedOrder] = React.useState('Todos');
  // const [activeJob, setActiveJob] = React.useState<JobFormatted | undefined>(
  //   undefined,
  // );
  // const [newCycle, setNewCycle] = React.useState<Cycle | null>(null);

  const { state, dispatch, createInitialState } = useInitialJobsState();

  const { jobsData } = state;

  const { user } = useAuth();
  // const userId = user?.uid;

  // const navigate = useNavigate();

  // const fetchJob = React.useCallback((key: string) => {
  //   if (!key) return;

  //   onValue(ref(db, `jobs/${key}`), (snapshot) => {
  //     if (snapshot && snapshot.exists()) {
  //       // const val: Job = snapshot.val();

  //       if (!snapshot.key) return;

  //       // dispatch(setActiveJobActions({ ...val, id: snapshot.key }));
  //     }
  //   });
  // }, []);

  // const updateActiveJob = React.useCallback((job: JobFormatted) => {
  //   // dispatch(setActiveJobActions(job));
  //   return;
  //   job;
  // }, []);

  const orderBy = React.useCallback(
    (value: OrderBy) => {
      dispatch(orderByJobActions(value));
    },
    [dispatch],
  );

  const handleSelectedOrder = React.useCallback((value: string) => {
    setSelectedOrder(value);
  }, []);

  const deleteJob = React.useCallback(
    (id: string) => {
      dispatch(deleteJobActions(id));
    },
    [dispatch],
  );

  React.useEffect(() => {
    if (!user) return;

    createInitialState(user?.uid);
  }, [createInitialState, user]);

  // // Set Active Job
  // React.useEffect(() => {
  //   if (activeJobData) {
  //     const job = formatJob(activeJobData, cyclesData);

  //     setActiveJob(job);
  //   }
  // }, [activeJobData, formatJob, cyclesData]);

  const values = React.useMemo(
    () => ({
      jobsData,
      jobDispatch: dispatch,
      // cyclesData,
      // createNewJob,
      // newCycle,
      // fetchJob,
      // activeJob,
      // updateActiveJob,
      // updateJob,
      deleteJob,
      orderBy,
      selectedOrder,
      handleSelectedOrder,
      // showToast,
    }),
    [
      jobsData,
      dispatch,
      // cyclesData,
      // createNewJob,
      // newCycle,
      // fetchJob,
      // activeJob,
      // updateActiveJob,
      // updateJob,
      deleteJob,
      orderBy,
      selectedOrder,
      handleSelectedOrder,
      // showToast,
    ],
  );

  return <JobsContext.Provider value={values}>{children}</JobsContext.Provider>;
};
