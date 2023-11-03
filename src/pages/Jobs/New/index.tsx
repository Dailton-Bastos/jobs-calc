import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Box, Flex, Text } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { ref, push, ThenableReference } from 'firebase/database';
import * as yup from 'yup';

import { JobData, JobType } from '~/@types/job';
import { Container } from '~/components/Container';
import { Head } from '~/components/Head';
import { JobEstimate } from '~/components/Job/Estimate';
import { Title } from '~/components/Title';
import { db } from '~/config/firebase';
import { getTotalTimeInSeconds } from '~/helpers/utils';
import { useAuth } from '~/hooks/useAuth';
import { useCustomToast } from '~/hooks/useCustomToast';
import { useCyclesContext } from '~/hooks/useCyclesContext';
import { useJobsContext } from '~/hooks/useJobsContext';
import { startNewCycleAction } from '~/reducers/cycles/actions';
import { addNewJobActions } from '~/reducers/jobs/actions';
import {
  jobTypeBudgetAction,
  jobTypeOtherAction,
  jobTypeDevelopmentAction,
} from '~/reducers/JobType/actions';
import {
  JOB_TYPE_INITIAL_STATE,
  jobTypeReducer,
} from '~/reducers/JobType/reducer';
import { jobFormValidationSchema } from '~/schemas/jobFormSchema';

import { Form } from './Form';

type NewJobFormData = yup.InferType<typeof jobFormValidationSchema>;

export type NewJobFormDataProps = NewJobFormData & {
  isHighlight: boolean;
};

export const NewJobPage = () => {
  const [isHighlight, setIsHighlight] = React.useState(false);

  const [jobTypeState, dispatch] = React.useReducer(
    jobTypeReducer,
    JOB_TYPE_INITIAL_STATE,
  );

  const { user } = useAuth();
  const userId = user?.uid;

  const { customToast } = useCustomToast();

  const { isDisableEstimateField, isDisableJobberIdField } = jobTypeState;

  const newJobForm = useForm<NewJobFormDataProps>({
    mode: 'all',
    defaultValues: {
      jobberId: '',
      title: '',
      hourEstimate: 1,
      minutesEstimate: 0,
      isHighlight: false,
      type: 'other',
      description: '',
    },
    resolver: yupResolver(jobFormValidationSchema),
  });

  const { handleSubmit, formState, watch, resetField, reset, register } =
    newJobForm;

  const { errors } = formState;

  const navigate = useNavigate();

  const { jobDispatch } = useJobsContext();
  const { cycleDispatch } = useCyclesContext();

  const handleStartNewCycle = React.useCallback(
    (jobId: string) => {
      if (!user) return;

      const dateInTimestamp = new Date().getTime();

      const cycle = {
        userId: user.uid,
        jobId,
        startDate: dateInTimestamp,
        isActive: true,
        description: '',
      };

      const { key }: ThenableReference = push(ref(db, 'cycles'), cycle);

      if (!key) return;

      cycleDispatch(
        startNewCycleAction({
          id: key,
          ...cycle,
        }),
      );
    },
    [cycleDispatch, user],
  );

  const createNewJob = React.useCallback(
    (data: JobData) => {
      if (!userId) return;

      const { key: id }: ThenableReference = push(ref(db, 'jobs'), data);

      if (!id) return;

      const jobAction = { id, ...data };

      jobDispatch(addNewJobActions(jobAction));

      handleStartNewCycle(id);

      customToast({
        title: 'Novo Job',
        description: 'Um novo job foi iniciado',
        status: 'success',
      });

      navigate(`/jobs/${id}`);
    },
    [navigate, jobDispatch, userId, customToast, handleStartNewCycle],
  );

  const type = watch('type') as JobType;

  const jobTypeActions = React.useCallback(
    (jobType: JobType) => {
      switch (jobType) {
        case 'budget':
          dispatch(jobTypeBudgetAction());
          resetField('hourEstimate');
          resetField('minutesEstimate');
          break;
        case 'other':
          dispatch(jobTypeOtherAction());
          resetField('jobberId');
          break;

        default:
          dispatch(jobTypeDevelopmentAction());
          break;
      }
    },
    [resetField],
  );

  const handleChangeHighlight = React.useCallback(() => {
    setIsHighlight((prev) => !prev);
  }, []);

  React.useEffect(() => {
    jobTypeActions(type);
  }, [type, jobTypeActions]);

  const handleCreateNewJob = React.useCallback(
    (data: NewJobFormData) => {
      if (!userId) return;

      const dateInTimestamp = new Date().getTime();

      const hourEstimate = data.hourEstimate ?? 1;
      const minutesEstimate = data.minutesEstimate ?? 0;
      const totalSecondsAmount = getTotalTimeInSeconds(
        hourEstimate,
        minutesEstimate,
        0,
      );

      createNewJob({
        ...data,
        userId,
        type: data.type as JobType,
        totalSecondsAmount,
        status: 'developing',
        hourEstimate,
        minutesEstimate,
        totalSecondsRemaining: totalSecondsAmount,
        isHighlight,
        createdAt: dateInTimestamp,
        updatedAt: dateInTimestamp,
      });

      reset();
    },
    [createNewJob, reset, isHighlight, userId],
  );

  return (
    <>
      <Head title="Novo Job" />

      <Container title="Adicionar Novo Job">
        <FormProvider {...newJobForm}>
          <Box w="100%" as="form" onSubmit={handleSubmit(handleCreateNewJob)}>
            <Title title="Informações do Job" />

            <Flex
              mt="8"
              alignItems="start"
              justifyContent="space-between"
              gap="8"
            >
              <input
                type="hidden"
                value="development"
                {...register('status')}
              />

              <Form
                errors={errors}
                isDisableEstimateField={isDisableEstimateField}
                isDisableJobberIdField={isDisableJobberIdField}
                isHighlight={isHighlight}
                handleChangeHighlight={handleChangeHighlight}
              />

              <Box maxW="420px" w="100%">
                <Text fontWeight="bold" textAlign="center" mb={4}>
                  Estimativa de horas
                </Text>

                <JobEstimate />
              </Box>
            </Flex>
          </Box>
        </FormProvider>
      </Container>
    </>
  );
};
