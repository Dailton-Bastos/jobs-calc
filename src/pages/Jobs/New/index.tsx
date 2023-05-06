import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Switch,
  VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { JobType } from '~/@types/job';
import { ActiveCycleInfo } from '~/components/ActiveCycleInfo';
import { Container } from '~/components/Container';
import { Input } from '~/components/Form/Input';
import { Select } from '~/components/Form/Select';
import { Textarea } from '~/components/Form/Textarea';
import { Head } from '~/components/Head';
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
import { jobFormValidationSchema } from '~/schemas/jobFormSchema';

type NewJobFormData = yup.InferType<typeof jobFormValidationSchema>;

type NewJobFormDataProps = NewJobFormData & {
  isHighlight: boolean;
};

export const NewJobPage = () => {
  const [isHighlight, setIsHighlight] = React.useState(false);

  const [jobTypeState, dispatch] = React.useReducer(
    jobTypeReducer,
    JOB_TYPE_INITIAL_STATE,
  );

  const { isDisableEstimateField, isDisableJobberIdField } = jobTypeState;

  const newJobForm = useForm<NewJobFormDataProps>({
    mode: 'all',
    defaultValues: {
      jobberId: '',
      hourEstimate: 1,
      minutesEstimate: 0,
      isHighlight: false,
    },
    resolver: yupResolver(jobFormValidationSchema),
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

  const handleChangeHighlight = React.useCallback(() => {
    setIsHighlight((prev) => !prev);
  }, []);

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
        isHighlight,
      });

      reset();
    },
    [createNewJob, reset, isHighlight],
  );

  return (
    <>
      <Head title="Novo Job" />

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
                  <Title title="Dados do Job" />

                  <Box mt="8">
                    <VStack spacing="6" align="flex-start">
                      <Select
                        registerName="type"
                        label="Tipo"
                        options={jobSelectTypes}
                        error={errors?.type}
                      />

                      <Grid gap="6" templateColumns="140px 1fr" w="100%">
                        <GridItem w="100%">
                          <Input
                            registerName="jobberId"
                            label="Jobber ID"
                            isDisabled={isDisableJobberIdField}
                            error={errors?.jobberId}
                          />
                        </GridItem>

                        <GridItem w="100%">
                          <Input
                            registerName="title"
                            label="Título"
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
                        label="Briefing (Opcional)"
                      />

                      <FormControl display="flex" alignItems="center">
                        <FormLabel htmlFor="highlight" mb="0">
                          Destaque?
                        </FormLabel>
                        <Switch
                          id="highlight"
                          colorScheme="green"
                          isChecked={isHighlight}
                          onChange={handleChangeHighlight}
                        />
                      </FormControl>
                    </VStack>
                  </Box>
                </Box>

                <JobEstimate />
              </FormProvider>
            </Flex>
          </Box>
        </>
      </Container>
    </>
  );
};
