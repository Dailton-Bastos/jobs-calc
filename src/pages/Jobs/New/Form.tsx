import React from 'react';
import { FieldErrorsImpl, useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Switch,
  VStack,
} from '@chakra-ui/react';

import { Input } from '~/components/Form/Input';
import { RadioGroup } from '~/components/Form/RadioGroup';
import { Textarea } from '~/components/Form/Textarea';
import { jobTypeOptions } from '~/helpers/utils';

import type { NewJobFormDataProps } from '.';

type Props = {
  errors: FieldErrorsImpl<NewJobFormDataProps>;
  isDisableEstimateField: boolean;
  isDisableJobberIdField: boolean;
};

export const Form = ({
  errors,
  isDisableEstimateField,
  isDisableJobberIdField,
}: Props) => {
  const { watch, register } = useFormContext<NewJobFormDataProps>();

  const isHighlight = watch('isHighlight');

  return (
    <VStack spacing="6" align="flex-start" flex="1" pr="8">
      <RadioGroup
        name="type"
        label="Tipo do Job"
        options={jobTypeOptions}
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
          <Input registerName="title" label="Título" error={errors?.title} />
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

      <Textarea registerName="description" label="Briefing (Opcional)" />

      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="highlight" mb="0">
          Destaque?
        </FormLabel>
        <Switch
          {...register('isHighlight')}
          id="highlight"
          colorScheme="green"
          isChecked={isHighlight}
        />
      </FormControl>
    </VStack>
  );
};
