import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Box, Flex, Grid, GridItem, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Container } from '~/components/Container';
import { Input } from '~/components/Form/Input';
import { Select } from '~/components/Form/Select';
import { Textarea } from '~/components/Form/Textarea';
import { JobEstimate } from '~/components/Job/Estimate';
import { Title } from '~/components/Title';
import type { JobType } from '~/contexts/Jobs/JobsContext';
import { jobSelectTypes } from '~/helpers/utils';
import { useJobsContext } from '~/hooks/useJobsContext';
import {
  jobTypeBudgetAction,
  jobTypeOtherAction,
  jobTypeDevelopmentAction,
} from '~/reducers/JobType/actions';
import { jobTypeReducer } from '~/reducers/JobType/reducer';
import { newJobFormValidationSchema } from '~/schemas/newJobFormSchema';

type NewJobFormData = yup.InferType<typeof newJobFormValidationSchema>;

export const NewJobPage = () => {
  const [jobTypeState, dispatch] = React.useReducer(jobTypeReducer, {
    isDisableEstimateField: false,
    isDisableJobberIdField: false,
    isResetEstimateField: false,
    isResetJobberIdField: false,
  });

  const { isDisableEstimateField, isDisableJobberIdField } = jobTypeState;

  const newJobForm = useForm<NewJobFormData>({
    mode: 'all',
    defaultValues: {
      jobberId: '',
      hourEstimate: 1,
      minutesEstimate: 0,
    },
    resolver: yupResolver(newJobFormValidationSchema),
  });

  const { handleSubmit, formState, watch, resetField, reset } = newJobForm;

  const { errors, isSubmitting } = formState;

  const { createNewJob } = useJobsContext();

  const hourEstimate = watch('hourEstimate');
  const minutesEstimate = watch('minutesEstimate');
  const type = watch('type');

  const jobTypeBudget = React.useCallback(() => {
    dispatch(jobTypeBudgetAction());

    resetField('hourEstimate');
    resetField('minutesEstimate');
  }, [resetField]);

  const jobTypeOther = React.useCallback(() => {
    dispatch(jobTypeOtherAction());

    resetField('jobberId');
  }, [resetField]);

  const jobTypeDevelopement = React.useCallback(() => {
    dispatch(jobTypeDevelopmentAction());
  }, []);

  React.useEffect(() => {
    switch (type) {
      case 'budget':
        jobTypeBudget();
        break;
      case 'other':
        jobTypeOther();
        break;

      default:
        jobTypeDevelopement();
        break;
    }
  }, [type, jobTypeBudget, jobTypeOther, jobTypeDevelopement]);

  const handleCreateNewJob = React.useCallback(
    (data: NewJobFormData) => {
      createNewJob({
        ...data,
        type: data.type as JobType,
        hourEstimate: data?.hourEstimate ?? 0,
        minutesEstimate: data?.minutesEstimate ?? 0,
      });

      reset();
    },
    [createNewJob, reset],
  );

  return (
    <Container title="Adicionar Novo Job" to="/jobs">
      <Box as="section">
        <Flex
          as="form"
          alignItems="center"
          justifyContent="space-between"
          gap="8"
          onSubmit={handleSubmit(handleCreateNewJob)}
        >
          <Box w="100%" maxW="640px">
            <Title>Dados do Job</Title>

            <Box mt="8">
              <VStack spacing="6" align="flex-start">
                <FormProvider {...newJobForm}>
                  <Select
                    registerName="type"
                    label="Tipo do Job*"
                    options={jobSelectTypes}
                    error={errors?.type}
                  />

                  <Grid gap="6" templateColumns="140px 1fr" w="100%">
                    <GridItem w="100%">
                      <Input
                        registerName="jobberId"
                        label="ID Jobber"
                        isDisabled={isDisableJobberIdField}
                        error={errors?.jobberId}
                      />
                    </GridItem>

                    <GridItem w="100%">
                      <Input
                        registerName="title"
                        label="Título do Job*"
                        error={errors?.title}
                      />
                    </GridItem>
                  </Grid>

                  <Grid gap="6" templateColumns="repeat(2, 1fr)" w="100%">
                    <Input
                      registerName="hourEstimate"
                      label="Tempo Estimado (h)"
                      isDisabled={isDisableEstimateField}
                      error={errors?.hourEstimate}
                    />

                    <Input
                      registerName="minutesEstimate"
                      label="Tempo Estimado (min)"
                      isDisabled={isDisableEstimateField}
                      error={errors?.minutesEstimate}
                    />
                  </Grid>

                  <Textarea
                    registerName="description"
                    label="Descrição (Opcional)"
                  />
                </FormProvider>
              </VStack>
            </Box>
          </Box>

          <JobEstimate
            hourEstimate={hourEstimate}
            minutesEstimate={minutesEstimate}
            isSubmitting={isSubmitting}
          />
        </Flex>
      </Box>
    </Container>
  );
};
