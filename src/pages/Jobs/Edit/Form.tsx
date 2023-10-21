import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Switch,
  Text,
  VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { JobStatus, JobType } from '~/@types/job';
import { Input } from '~/components/Form/Input';
import { RadioGroup } from '~/components/Form/RadioGroup';
import { Textarea } from '~/components/Form/Textarea';
import { Title } from '~/components/Title';
import { getTotalTimeInSeconds } from '~/helpers/utils';
import { useJobs } from '~/hooks/useJobs';
import { useJobsContext } from '~/hooks/useJobsContext';
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
type EditJobFormData = yup.InferType<typeof jobFormValidationSchema>;

interface Props {
  jobId: string;
}

export const Form = ({ jobId }: Props) => {
  const [isHighlight, setIsHighlight] = React.useState(false);

  const { jobsData } = useJobsContext();
  const { updateJob } = useJobs();

  const navigate = useNavigate();

  const jobApiData = jobsData.find((job) => job.id === jobId);

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

  const { errors, isSubmitting } = formState;

  const jobTypeOptions = React.useMemo(
    () => [
      {
        name: 'Interno',
        value: 'other',
        statusColor: 'orange' as const,
      },
      {
        name: 'Orçamento',
        value: 'budget',
        statusColor: 'orange' as const,
      },
      {
        name: 'Desenvolvimento',
        value: 'development',
        statusColor: 'orange' as const,
      },
    ],
    [],
  );

  const jobStatusOptions = React.useMemo(
    () => [
      {
        name: 'Em aberto',
        value: 'opened',
        statusColor: 'blue' as const,
      },
      {
        name: 'Em andamento',
        value: 'developing',
        statusColor: 'yellow' as const,
      },
      {
        name: 'Em pausa',
        value: 'paused',
        statusColor: 'gray' as const,
      },
      {
        name: 'Concluído',
        value: 'done',
        statusColor: 'green' as const,
      },
    ],
    [],
  );

  const hourEstimate = Number(watch('hourEstimate'))
    .toString()
    .padStart(2, '0');

  const minutesEstimate = Number(watch('minutesEstimate'))
    .toString()
    .padStart(2, '0');

  const handleChangeJobHighlight = React.useCallback(() => {
    setIsHighlight((prevState) => !prevState);
  }, []);

  const type = watch('type') as JobType;
  const status = watch('status') as JobStatus;

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

  const handleResetForm = React.useCallback(() => {
    if (jobApiData) {
      reset({ ...jobApiData });

      setIsHighlight(jobApiData?.isHighlight);
    }
  }, [jobApiData, reset]);

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

  return (
    <FormProvider {...editJobForm}>
      <Box w="100%" as="form" onSubmit={handleSubmit(handleUpdateJob)}>
        <Title title="Informações do Job" />

        <Flex mt="8" alignItems="start" justifyContent="space-between" gap="8">
          <VStack spacing="6" align="flex-start" flex="1" pr="8">
            <RadioGroup
              name="type"
              label="Tipo do Job"
              options={jobTypeOptions}
              error={errors?.type}
            />

            <Flex gap="6" w="100%">
              {!isDisableJobberIdField && (
                <Box maxW="110px">
                  <Input
                    registerName="jobberId"
                    label="Jobber ID"
                    error={errors?.jobberId}
                    isDisabled={isDisableJobberIdField}
                  />
                </Box>
              )}

              <Box width="100%">
                <Input
                  registerName="title"
                  label="Título"
                  error={errors?.title}
                />
              </Box>
            </Flex>

            <Grid gap="6" templateColumns="repeat(2, 1fr)" w="100%">
              <Input
                registerName="hourEstimate"
                label="Tempo Estimado (h)"
                type="number"
                error={errors?.hourEstimate}
                isDisabled={isDisableEstimateField}
              />

              <Input
                registerName="minutesEstimate"
                label="Tempo Estimado (min)"
                type="number"
                error={errors?.minutesEstimate}
                isDisabled={isDisableEstimateField}
              />
            </Grid>

            <Textarea
              registerName="description"
              label="Briefing (Opcional)"
              h="180px"
            />

            <RadioGroup
              name="status"
              label="Status do Job"
              options={jobStatusOptions}
              error={errors?.status}
            />

            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="highlight" mb="0" fontWeight="bold">
                Destaque?
              </FormLabel>
              <Switch
                id="highlight"
                colorScheme="green"
                isChecked={isHighlight}
                onChange={handleChangeJobHighlight}
              />
            </FormControl>
          </VStack>

          <Box maxW="420px" w="100%">
            <Text fontWeight="bold" textAlign="center" mb={4}>
              Estimativa de horas
            </Text>

            <Estimate
              hourEstimate={hourEstimate}
              minutesEstimate={minutesEstimate}
              resetForm={handleResetForm}
              isLoading={isSubmitting}
            />
          </Box>
        </Flex>
      </Box>
    </FormProvider>
  );
};
