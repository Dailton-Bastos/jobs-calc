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
  Text,
  VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Job, JobStatus } from '~/@types/job';
import { Input } from '~/components/Form/Input';
import { Select } from '~/components/Form/Select';
import { Textarea } from '~/components/Form/Textarea';
import { Status } from '~/components/Job/Status';
import { Title } from '~/components/Title';
import { jobSelectTypes } from '~/helpers/utils';
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

  const editJobForm = useForm<EditJobFormData>({
    mode: 'all',
    defaultValues: job,
    resolver: yupResolver(jobFormValidationSchema),
  });

  const { formState, handleSubmit, watch, reset } = editJobForm;

  const { errors } = formState;

  const hourEstimate = Number(watch('hourEstimate'))
    .toString()
    .padStart(2, '0');

  const minutesEstimate = Number(watch('minutesEstimate'))
    .toString()
    .padStart(2, '0');

  const handleChangeJobStatus = React.useCallback((nextValue: JobStatus) => {
    setStatus(nextValue);
  }, []);

  const handleChangeJobHighlight = React.useCallback(() => {
    setIsHighlight((prevState) => !prevState);
  }, []);

  const handleUpdateJob = React.useCallback(
    (data: EditJobFormData) => {
      const jobData: EditJobFormData = {
        ...data,
        status,
        isHighlight,
      };

      return jobData;
    },

    [status, isHighlight],
  );

  const handleResetForm = React.useCallback(() => {
    if (job) {
      reset({ ...job });
      setIsHighlight(job?.isHighlight ?? false);
    }
  }, [job, reset]);

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
              <Grid gap="6" templateColumns="110px 1fr" w="100%">
                <GridItem w="100%">
                  <Input
                    registerName="jobberId"
                    label="Jobber ID"
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
                />

                <Input
                  registerName="minutesEstimate"
                  label="Tempo Estimado (min)"
                  type="number"
                  error={errors?.minutesEstimate}
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
        />
      </Flex>
    </FormProvider>
  );
};
