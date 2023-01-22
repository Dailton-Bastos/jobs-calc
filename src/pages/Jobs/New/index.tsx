import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Box, Flex, Grid, GridItem, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';

import { CreateJobFormData } from '~/@types/job';
import { Container } from '~/components/Container';
import { Input } from '~/components/Form/Input';
import { InputNumber } from '~/components/Form/InputNumber';
import { Select } from '~/components/Form/Select';
import { Textarea } from '~/components/Form/Textarea';
import { JobEstimate } from '~/components/Job/Estimate';
import { Title } from '~/components/Title';
import { useAuth } from '~/hooks/useAuth';
import { useJob } from '~/hooks/useJob';
import { createJobFormSchema } from '~/schemas/createJobFormSchema';

const jobTypes = [
  {
    name: 'Orçamento',
    value: 'budget',
  },
  {
    name: 'Desenvolvimento',
    value: 'development',
  },
  {
    name: 'Outros',
    value: 'other',
  },
];

export const NewJobPage = () => {
  const [jobEstimateHour, setJobEstimateHour] = React.useState(1);
  const [jobEstimateMinutes, setJobEstimateMinutes] = React.useState(0);
  const [jobId, setJobId] = React.useState('');
  const [jobType, setJobType] = React.useState('');
  const [isJobIdFieldDisabled, setIsJobIdFieldDisabled] = React.useState(false);
  const [isJobEstimateFieldDisabled, setIsJobEstimateFieldDisabled] =
    React.useState(false);

  const { user } = useAuth();

  const { register, handleSubmit, resetField, formState } =
    useForm<CreateJobFormData>({
      mode: 'all',
      defaultValues: {
        job_estimate_hour: 1,
        job_estimate_minutes: 0,
        job_id: '',
      },
      resolver: yupResolver(createJobFormSchema),
    });

  const { errors, isSubmitting } = formState;

  const { handleCreateJobData } = useJob();

  const handleJobEstimateHour = React.useCallback((e: string) => {
    setJobEstimateHour(Number(e));
  }, []);

  const handleJobEstimateMinutes = React.useCallback((e: string) => {
    setJobEstimateMinutes(Number(e));
  }, []);

  const handleIdJobber = React.useCallback((e: string) => {
    setJobId(e);
  }, []);

  const handleJobType = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setJobType(e.target.value);
    },
    [],
  );

  const onSubmit: SubmitHandler<CreateJobFormData> = React.useCallback(
    async (data: CreateJobFormData) => {
      const values = {
        ...data,
        job_estimate_hour: jobType === 'budget' ? 1 : data?.job_estimate_hour,
        job_estimate_minutes:
          jobType === 'budget' ? 0 : data?.job_estimate_minutes,
        estimateTotalSeconds:
          (data.job_estimate_hour * 60 + data.job_estimate_minutes) * 60,
        user_id: user?.uid as string,
        status: 'opened' as const,
      };

      await handleCreateJobData(values);
    },
    [jobType, handleCreateJobData, user],
  );

  React.useEffect(() => {
    switch (jobType) {
      case 'budget':
        setIsJobEstimateFieldDisabled(true);
        setIsJobIdFieldDisabled(false);
        setJobEstimateHour(1);
        setJobEstimateMinutes(0);
        resetField('job_estimate_hour');
        resetField('job_estimate_minutes');
        break;

      case 'other':
        setIsJobIdFieldDisabled(true);
        setIsJobEstimateFieldDisabled(false);
        setJobId('');
        resetField('job_id');
        break;

      default:
        setIsJobEstimateFieldDisabled(false);
        setIsJobIdFieldDisabled(false);
        setJobEstimateHour((prev) => prev);
        setJobEstimateMinutes((prev) => prev);
        setJobId((prev) => prev);
        break;
    }
  }, [jobType, resetField]);

  return (
    <Container title="Adicionar Novo Job" to="/jobs">
      <Box as="section">
        <Flex
          as="form"
          alignItems="center"
          justifyContent="space-between"
          gap="8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box w="100%" maxW="640px">
            <Title>Dados do Job</Title>

            <Box mt="8">
              <VStack spacing="6" align="flex-start">
                <Grid gap="6" templateColumns="140px 1fr" w="100%">
                  <GridItem w="100%">
                    <InputNumber
                      {...register('job_id')}
                      label={`ID no Jobber${jobType !== 'other' ? '*' : ''}`}
                      max={undefined}
                      min={undefined}
                      value={jobId}
                      onChange={handleIdJobber}
                      isDisabled={isJobIdFieldDisabled}
                      error={errors?.job_id}
                    />
                  </GridItem>

                  <GridItem w="100%">
                    <Input
                      {...register('job_title')}
                      label="Título do Job*"
                      error={errors?.job_title}
                    />
                  </GridItem>
                </Grid>

                <Select
                  {...register('job_type')}
                  label="Tipo do Job*"
                  options={jobTypes}
                  onChange={handleJobType}
                  error={errors?.job_type}
                />

                <Grid gap="6" templateColumns="repeat(2, 1fr)" w="100%">
                  <InputNumber
                    {...register('job_estimate_hour')}
                    label="Tempo Estimado (h)*"
                    max={100}
                    min={0}
                    stepper
                    value={jobEstimateHour}
                    onChange={handleJobEstimateHour}
                    isDisabled={isJobEstimateFieldDisabled}
                  />

                  <InputNumber
                    {...register('job_estimate_minutes')}
                    label="Tempo Estimado (min)*"
                    max={59}
                    min={0}
                    stepper
                    value={jobEstimateMinutes}
                    onChange={handleJobEstimateMinutes}
                    isDisabled={isJobEstimateFieldDisabled}
                    error={errors?.job_estimate_minutes}
                  />
                </Grid>

                <Textarea
                  {...register('job_briefing')}
                  label="Briefing (Opcional)"
                />
              </VStack>
            </Box>
          </Box>

          <JobEstimate
            estimateHour={jobEstimateHour}
            estimateMinutes={jobEstimateMinutes}
            isSubmitting={isSubmitting}
          />
        </Flex>
      </Box>
    </Container>
  );
};
