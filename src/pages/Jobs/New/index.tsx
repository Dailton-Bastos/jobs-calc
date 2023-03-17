import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Box, Flex, Grid, GridItem, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { JobType } from '~/@types/job';
import { ActiveCycleInfo } from '~/components/ActiveCycleInfo';
import { Container } from '~/components/Container';
import { Input } from '~/components/Form/Input';
import { Select } from '~/components/Form/Select';
import { Textarea } from '~/components/Form/Textarea';
import { JobEstimate } from '~/components/Job/Estimate';
import { Title } from '~/components/Title';
import { getTotalTimeInSeconds, jobSelectTypes } from '~/helpers/utils';
import { useJobsContext } from '~/hooks/useJobsContext';
import {
  jobTypeBudgetAction,
  jobTypeOtherAction,
  jobTypeDevelopmentAction,
} from '~/reducers/JobType/actions';
import {
  JOB_TYPE_INITIAL_STATE,
  jobTypeReducer,
} from '~/reducers/JobType/reducer';
import { newJobFormValidationSchema } from '~/schemas/newJobFormSchema';

type NewJobFormData = yup.InferType<typeof newJobFormValidationSchema>;

export const NewJobPage = () => {
  const [jobTypeState, dispatch] = React.useReducer(
    jobTypeReducer,
    JOB_TYPE_INITIAL_STATE,
  );

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

  const { errors } = formState;

  const { createNewJob } = useJobsContext();

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

  React.useEffect(() => {
    jobTypeActions(type);
  }, [type, jobTypeActions]);

  const handleCreateNewJob = React.useCallback(
    (data: NewJobFormData) => {
      const hourEstimate = data?.hourEstimate ?? 0;
      const minutesEstimate = data?.minutesEstimate ?? 0;

      createNewJob({
        ...data,
        type: data.type as JobType,
        hourEstimate,
        minutesEstimate,
        totalSecondsAmount: getTotalTimeInSeconds(
          hourEstimate,
          minutesEstimate,
          0,
        ),
      });

      reset();
    },
    [createNewJob, reset],
  );

  return (
    <Container title="Adicionar Novo Job" to="/jobs">
      <>
        <ActiveCycleInfo />

        <Box as="section">
          <Flex
            as="form"
            alignItems="center"
            justifyContent="space-between"
            gap="8"
            onSubmit={handleSubmit(handleCreateNewJob)}
          >
            <FormProvider {...newJobForm}>
              <Box w="100%" maxW="640px">
                <Title>Dados do Job</Title>

                <Box mt="8">
                  <VStack spacing="6" align="flex-start">
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
                        type="number"
                        isDisabled={isDisableEstimateField}
                        error={errors?.hourEstimate}
                      />

                      <Input
                        registerName="minutesEstimate"
                        label="Tempo Estimado (min)"
                        type="number"
                        isDisabled={isDisableEstimateField}
                        error={errors?.minutesEstimate}
                      />
                    </Grid>

                    <Textarea
                      registerName="description"
                      label="Descrição (Opcional)"
                    />
                  </VStack>
                </Box>
              </Box>

              <JobEstimate />
            </FormProvider>
          </Flex>
        </Box>
      </>
    </Container>
  );
};
