import React from 'react';

import type { JobsProviderProps, OrderBy } from '~/@types/job';
import { useAuth } from '~/hooks/useAuth';
import { useInitialJobsState } from '~/hooks/useInitialJobsState';
import { deleteJobActions, orderByJobActions } from '~/reducers/jobs/actions';

import { JobsContext } from './JobsContext';

export const JobsProvider = ({ children }: JobsProviderProps) => {
  const [selectedOrder, setSelectedOrder] = React.useState('Todos');

  const { state, dispatch, createInitialState } = useInitialJobsState();

  const { jobsData, data } = state;

  const { user } = useAuth();

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

  const values = React.useMemo(
    () => ({
      jobsData,
      data,
      jobDispatch: dispatch,
      deleteJob,
      orderBy,
      selectedOrder,
      handleSelectedOrder,
    }),
    [
      jobsData,
      data,
      dispatch,
      deleteJob,
      orderBy,
      selectedOrder,
      handleSelectedOrder,
    ],
  );

  return <JobsContext.Provider value={values}>{children}</JobsContext.Provider>;
};
