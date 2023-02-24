import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Box, Flex, Grid, GridItem, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// import { CreateJobFormData } from '~/@types/job';
import { Container } from '~/components/Container';
import { Input } from '~/components/Form/Input';
import { InputNumber } from '~/components/Form/InputNumber';
import { Select } from '~/components/Form/Select';
import { Textarea } from '~/components/Form/Textarea';
import { JobEstimate } from '~/components/Job/Estimate';
import { Title } from '~/components/Title';
import type { JobType } from '~/contexts/Jobs/JobsContext';
import { jobSelectTypes } from '~/helpers/utils';
import { useJobsContext } from '~/hooks/useJobsContext';
// import { useAuth } from '~/hooks/useAuth';
import { newJobFormValidationSchema } from '~/schemas/newJobFormSchema';

type NewJobFormData = yup.InferType<typeof newJobFormValidationSchema>;

export const NewJobPage = () => {
  // const { user } = useAuth();

  const newJobForm = useForm<NewJobFormData>({
    mode: 'all',
    defaultValues: {
      hourEstimate: 1,
      minutesEstimate: 0,
    },
    resolver: yupResolver(newJobFormValidationSchema),
  });

  const { handleSubmit, formState, watch } = newJobForm;

  const { errors } = formState;

  const { createNewJob } = useJobsContext();

  const hourEstimate = watch('hourEstimate');
  const minutesEstimate = watch('minutesEstimate');

  // React.useEffect(() => {
  //   switch (jobType) {
  //     case 'budget':
  //       setIsJobEstimateFieldDisabled(true);
  //       setIsJobIdFieldDisabled(false);
  //       setJobEstimateHour(1);
  //       setJobEstimateMinutes(0);
  //       resetField('job_estimate_hour');
  //       resetField('job_estimate_minutes');
  //       break;

  //     case 'other':
  //       setIsJobIdFieldDisabled(true);
  //       setIsJobEstimateFieldDisabled(false);
  //       setJobId('');
  //       resetField('job_id');
  //       break;

  //     default:
  //       setIsJobEstimateFieldDisabled(false);
  //       setIsJobIdFieldDisabled(false);
  //       setJobEstimateHour((prev) => prev);
  //       setJobEstimateMinutes((prev) => prev);
  //       setJobId((prev) => prev);
  //       break;
  //   }
  // }, [jobType, resetField]);

  const handleCreateNewJob = React.useCallback(
    (data: NewJobFormData) => {
      createNewJob({
        ...data,
        type: data.type as JobType,
        hourEstimate: data?.hourEstimate ?? 0,
        minutesEstimate: data?.minutesEstimate ?? 0,
      });
    },
    [createNewJob],
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
                    <InputNumber
                      registerName="hourEstimate"
                      label="Tempo Estimado (h)*"
                      max={150}
                      clampValueOnBlur={false}
                      error={errors?.hourEstimate}
                    />

                    <InputNumber
                      registerName="minutesEstimate"
                      label="Tempo Estimado (min)*"
                      max={59}
                      clampValueOnBlur={false}
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
          />
        </Flex>
      </Box>
    </Container>
  );
};
