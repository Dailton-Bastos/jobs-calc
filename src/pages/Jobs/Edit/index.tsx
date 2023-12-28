import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';

import { Box, Flex, Text } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { JobStatus, JobType } from '~/@types/job';
import { Title } from '~/components/Title';
import { getTotalTimeInSeconds } from '~/helpers/utils';
import { useJobs } from '~/hooks/useJobs';
import { useJobsContext } from '~/hooks/useJobsContext';
import { userTitle } from '~/Layouts/Main/hooks/useTitle';
import {
  jobTypeBudgetAction,
  jobTypeDevelopmentAction,
  jobTypeOtherAction,
} from '~/reducers/JobType/actions';
import {
  JOB_TYPE_INITIAL_STATE,
  jobTypeReducer,
} from '~/reducers/JobType/reducer';
import { jobFormValidationSchema } from '~/schemas/jobFormSchema';

import { Estimate } from './Estimate';
import { Form } from './Form';

type EditJobFormData = yup.InferType<typeof jobFormValidationSchema>;

export const EditJobPage = () => {
  const { id } = useParams();

  const [isHighlight, setIsHighlight] = React.useState(false);

  const { jobsData } = useJobsContext();
  const { updateJob } = useJobs();

  const setPageTitle = userTitle((state) => state.setpageTitle);
  const setHeaderTitle = userTitle((state) => state.setHeaderTitle);

  const navigate = useNavigate();

  const jobApiData = jobsData.find((job) => job.id === id);

  const [jobTypeState, dispatch] = React.useReducer(
    jobTypeReducer,
    JOB_TYPE_INITIAL_STATE,
  );

  const { isDisableEstimateField, isDisableJobberIdField } = jobTypeState;

  const editJobForm = useForm<EditJobFormData>({
    mode: 'all',
    defaultValues: jobApiData,

    resolver: yupResolver(jobFormValidationSchema),
  });

  const { formState, handleSubmit, watch, reset, setValue } = editJobForm;

  const { errors } = formState;

  const type = watch('type') as JobType;
  const status = watch('status') as JobStatus;

  const handleResetForm = React.useCallback(() => {
    if (jobApiData) {
      reset({ ...jobApiData });
    }
  }, [jobApiData, reset]);

  const handleUpdateJob = React.useCallback(
    async (data: EditJobFormData) => {
      const jobHourEstimate = data?.hourEstimate ?? 0;
      const jobMinutesEstimate = data?.minutesEstimate ?? 0;
      const totalSecondsAmount = getTotalTimeInSeconds(
        jobHourEstimate,
        jobMinutesEstimate,
        0,
      );

      if (jobApiData) {
        await updateJob({
          ...jobApiData,
          ...data,
          type,
          hourEstimate: jobHourEstimate,
          minutesEstimate: jobMinutesEstimate,
          totalSecondsAmount,
          status,
          isHighlight,
        });

        navigate(`/jobs/${jobApiData.id}`);
      }
    },

    [status, isHighlight, jobApiData, updateJob, navigate, type],
  );

  const jobTypeBudget = React.useCallback(() => {
    dispatch(jobTypeBudgetAction());
    setValue('hourEstimate', 1);
    setValue('minutesEstimate', 0);
    setValue('jobberId', jobApiData?.jobberId);
  }, [setValue, jobApiData]);

  const jobTypeInternal = React.useCallback(() => {
    dispatch(jobTypeOtherAction());
    setValue('jobberId', '');
    setValue('hourEstimate', jobApiData?.hourEstimate);
    setValue('minutesEstimate', jobApiData?.minutesEstimate);
  }, [setValue, jobApiData]);

  const jobTypeDevelopment = React.useCallback(() => {
    dispatch(jobTypeDevelopmentAction());
    setValue('jobberId', jobApiData?.jobberId);
    setValue('hourEstimate', jobApiData?.hourEstimate);
    setValue('minutesEstimate', jobApiData?.minutesEstimate);
  }, [setValue, jobApiData]);

  const jobTypeActions = React.useCallback(
    (jobType: JobType) => {
      switch (jobType) {
        case 'budget':
          jobTypeBudget();
          break;
        case 'other':
          jobTypeInternal();
          break;

        default:
          jobTypeDevelopment();
          break;
      }
    },
    [jobTypeBudget, jobTypeInternal, jobTypeDevelopment],
  );

  React.useEffect(() => {
    jobTypeActions(type);
  }, [type, jobTypeActions]);

  React.useEffect(() => {
    if (jobApiData) {
      setIsHighlight(jobApiData.isHighlight);
    }
  }, [jobApiData]);

  React.useEffect(() => {
    setPageTitle(`Editar ${jobApiData?.title}`);

    setHeaderTitle('Editar Job');
  }, [jobApiData, setPageTitle, setHeaderTitle]);

  return (
    <FormProvider {...editJobForm}>
      <Box w="100%" as="form" onSubmit={handleSubmit(handleUpdateJob)}>
        <Title title="Informações do Job" />

        <Flex mt="8" alignItems="start" justifyContent="space-between" gap="8">
          <Form
            errors={errors}
            isDisableJobberIdField={isDisableJobberIdField}
            isDisableEstimateField={isDisableEstimateField}
          />

          <Box maxW="420px" w="100%">
            <Text fontWeight="bold" textAlign="center" mb={4} fontSize="md">
              Estimativa de horas
            </Text>

            <Estimate resetForm={handleResetForm} />
          </Box>
        </Flex>
      </Box>
    </FormProvider>
  );
};
