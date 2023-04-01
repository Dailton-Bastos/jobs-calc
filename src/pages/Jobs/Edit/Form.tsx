import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Switch,
  Text,
  VStack,
  useRadioGroup,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Input } from '~/components/Form/Input';
import { Select } from '~/components/Form/Select';
import { Textarea } from '~/components/Form/Textarea';
import { JobStatus } from '~/components/Job/Status';
import { Title } from '~/components/Title';
import { jobSelectStatus, jobSelectTypes } from '~/helpers/utils';
import { jobFormValidationSchema } from '~/schemas/jobFormSchema';

import { Estimate } from './Estimate';

type EditJobFormData = yup.InferType<typeof jobFormValidationSchema>;

type EditJobFormDataProps = EditJobFormData & {
  isHighlight: boolean;
};

export const Form = () => {
  const changeJobStatus = React.useCallback((value: string) => {
    return value;
  }, []);

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'status',
    defaultValue: 'developing',
    onChange: changeJobStatus,
  });

  const group = getRootProps();

  const editJobForm = useForm<EditJobFormDataProps>({
    mode: 'all',
    resolver: yupResolver(jobFormValidationSchema),
  });

  const { formState } = editJobForm;

  const { errors } = formState;

  return (
    <FormProvider {...editJobForm}>
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

            <Textarea registerName="description" label="Briefing (Opcional)" />

            <Box>
              <Text>Status</Text>

              <HStack {...group} mt="2">
                {jobSelectStatus?.map(({ name, value, color }) => {
                  const radio = getRadioProps({ value });
                  return (
                    <JobStatus key={value} {...radio} statusColor={color}>
                      {name}
                    </JobStatus>
                  );
                })}
              </HStack>
            </Box>

            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="highlight" mb="0">
                Destaque?
              </FormLabel>
              <Switch id="highlight" colorScheme="green" isChecked />
            </FormControl>
          </VStack>
        </Box>
      </Box>

      <Estimate />
    </FormProvider>
  );
};
