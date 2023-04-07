import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

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

import { Job, JobStatus, JobType } from '~/@types/job';
import { Input } from '~/components/Form/Input';
import { Select } from '~/components/Form/Select';
import { Textarea } from '~/components/Form/Textarea';
import { Status } from '~/components/Job/Status';
import { Title } from '~/components/Title';
import { getTotalTimeInSeconds, jobSelectTypes } from '~/helpers/utils';
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
  job: Job | undefined;
}

export const Form = ({ job }: Props) => {
  const [status, setStatus] = React.useState<JobStatus>(() => {
    return job?.status ?? 'opened';
  });
  const [isHighlight, setIsHighlight] = React.useState(() => {
    return job?.isHighlight ?? false;
  });

  const [jobTypeState, dispatch] = React.useReducer(
    jobTypeReducer,
    JOB_TYPE_INITIAL_STATE,
  );

  const { updateJob } = useJobsContext();

  const { isDisableEstimateField, isDisableJobberIdField } = jobTypeState;

  const editJobForm = useForm<EditJobFormData>({
    mode: 'all',
    defaultValues: job,
    resolver: yupResolver(jobFormValidationSchema),
  });

  const { formState, handleSubmit, watch, reset, setValue } = editJobForm;

  const { errors, isSubmitting } = formState;

  const hourEstimate = Number(watch('hourEstimate'))
    .toString()
    .padStart(2, '0');

  const minutesEstimate = Number(watch('minutesEstimate'))
    .toString()
    .padStart(2, '0');

  const type = watch('type') as JobType;

  const handleChangeJobStatus = React.useCallback((nextValue: JobStatus) => {
    setStatus(nextValue);
  }, []);

  const handleChangeJobHighlight = React.useCallback(() => {
    setIsHighlight((prevState) => !prevState);
  }, []);

  const handleUpdateJob = React.useCallback(
    (data: EditJobFormData) => {
      const jobHourEstimate = data?.hourEstimate ?? 0;
      const jobMinutesEstimate = data?.minutesEstimate ?? 0;
      const jobType = data?.type as JobType;
      const totalSecondsAmount = getTotalTimeInSeconds(
        jobHourEstimate,
        jobMinutesEstimate,
        0,
      );

      if (job) {
        updateJob({
          ...job,
          ...data,
          type: jobType,
          hourEstimate: jobHourEstimate,
          minutesEstimate: jobMinutesEstimate,
          totalSecondsAmount,
          status,
          isHighlight,
        });
      }

      reset({
        ...job,
        ...data,
        type: jobType,
        hourEstimate: jobHourEstimate,
        minutesEstimate: jobMinutesEstimate,
        status,
        isHighlight,
      });
    },

    [status, isHighlight, updateJob, job, reset],
  );

  const handleResetForm = React.useCallback(() => {
    if (job) {
      reset({ ...job });
      setIsHighlight(job?.isHighlight ?? false);
    }
  }, [job, reset]);

  const jobTypeBudget = React.useCallback(() => {
    dispatch(jobTypeBudgetAction());
    setValue('hourEstimate', 1);
    setValue('minutesEstimate', 0);
    setValue('jobberId', job?.jobberId);
  }, [setValue, job]);

  const jobTypeInternal = React.useCallback(() => {
    dispatch(jobTypeOtherAction());
    setValue('jobberId', '');
    setValue('hourEstimate', job?.hourEstimate);
    setValue('minutesEstimate', job?.minutesEstimate);
  }, [setValue, job]);

  const jobTypeDevelopment = React.useCallback(() => {
    dispatch(jobTypeDevelopmentAction());
    setValue('jobberId', job?.jobberId);
    setValue('hourEstimate', job?.hourEstimate);
    setValue('minutesEstimate', job?.minutesEstimate);
  }, [setValue, job]);

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

  return (
    <FormProvider {...editJobForm}>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        gap="8"
        as="form"
        onSubmit={handleSubmit(handleUpdateJob)}
      >
        <Box w="100%" maxW="640px">
          <Title>Dados do Job</Title>

          <Box mt="8">
            <VStack spacing="6" align="flex-start">
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

              <Select
                registerName="type"
                label="Tipo"
                options={jobSelectTypes}
                error={errors?.type}
              />

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
              />

              <Box>
                <Text>Status</Text>

                <Status
                  defaultValue={status}
                  onChange={handleChangeJobStatus}
                />
              </Box>

              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="highlight" mb="0">
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
          </Box>
        </Box>

        <Estimate
          hourEstimate={hourEstimate}
          minutesEstimate={minutesEstimate}
          resetForm={handleResetForm}
          isLoading={isSubmitting}
        />
      </Flex>
    </FormProvider>
  );
};
