import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import {
  Box,
  Flex,
  Grid,
  GridItem,
  FormControl,
  Textarea,
  VStack,
  Text,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';

import { CreateJobFormData } from '~/@types/job';
import { Container } from '~/components/Container';
import { Input } from '~/components/Form/Input';
import { InputNumber } from '~/components/Form/InputNumber';
import { Label } from '~/components/Form/Label';
import { Select } from '~/components/Form/Select';
import { JobEstimate } from '~/components/Job/Estimate';
import { Title } from '~/components/Title';
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
  const [jobEstimateMinutis, setJobEstimateMinutis] = React.useState(0);
  const [jobId, setJobId] = React.useState('');
  const [jobType, setJobType] = React.useState('');
  const [isJobIdFieldDisabled, setIsJobIdFieldDisabled] = React.useState(false);
  const [isJobEstimateFieldDisabled, setIsJobEstimateFieldDisabled] =
    React.useState(false);

  const { register, handleSubmit, resetField, formState } =
    useForm<CreateJobFormData>({
      mode: 'all',
      defaultValues: {
        job_estimate_hour: 1,
        job_estimate_minutis: 0,
        job_id: '',
      },
      resolver: yupResolver(createJobFormSchema),
    });

  const { errors } = formState;

  const handleJobEstimateHour = React.useCallback((e: string) => {
    setJobEstimateHour(Number(e));
  }, []);

  const handleJobEstimateMinutis = React.useCallback((e: string) => {
    setJobEstimateMinutis(Number(e));
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
    (data: CreateJobFormData) => {
      const values = {
        ...data,
        job_estimate_hour: jobType === 'budget' ? 1 : data?.job_estimate_hour,
        job_estimate_minutis:
          jobType === 'budget' ? 0 : data?.job_estimate_minutis,
      };

      return;
      values;
    },
    [jobType],
  );

  React.useEffect(() => {
    switch (jobType) {
      case 'budget':
        setIsJobEstimateFieldDisabled(true);
        setIsJobIdFieldDisabled(false);
        setJobEstimateHour(1);
        setJobEstimateMinutis(0);
        resetField('job_estimate_hour');
        resetField('job_estimate_minutis');
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
        setJobEstimateMinutis((prev) => prev);
        setJobId((prev) => prev);
        break;
    }
  }, [jobType, resetField]);

  return (
    <Container title="Adicionar Novo Job">
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
                    {...register('job_estimate_minutis')}
                    label="Tempo Estimado (min)*"
                    max={59}
                    min={0}
                    stepper
                    value={jobEstimateMinutis}
                    onChange={handleJobEstimateMinutis}
                    isDisabled={isJobEstimateFieldDisabled}
                    error={errors?.job_estimate_minutis}
                  />
                </Grid>

                <FormControl mb="4" fontWeight="500" lineHeight="6">
                  <Flex>
                    <Label>Briefing</Label>

                    <Text as="span" fontSize="small">
                      (Opcional)
                    </Text>
                  </Flex>
                  <Textarea
                    {...register('job_briefing')}
                    bg="white"
                    resize="none"
                    _focusVisible={{
                      borderColor: 'gray.500',
                    }}
                  />
                </FormControl>
              </VStack>
            </Box>
          </Box>

          <JobEstimate
            estimateHour={jobEstimateHour}
            estimateMinutis={jobEstimateMinutis}
          />
        </Flex>
      </Box>
    </Container>
  );
};
