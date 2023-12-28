import { FieldErrorsImpl, useFormContext } from 'react-hook-form';

import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Switch,
  VStack,
} from '@chakra-ui/react';
import * as yup from 'yup';

import { Input } from '~/components/Form/Input';
import { RadioGroup } from '~/components/Form/RadioGroup';
import { Textarea } from '~/components/Form/Textarea';
import { jobStatusOptions, jobTypeOptions } from '~/helpers/utils';
import { jobFormValidationSchema } from '~/schemas/jobFormSchema';

type EditJobFormData = yup.InferType<typeof jobFormValidationSchema>;

interface Props {
  errors: FieldErrorsImpl<EditJobFormData>;
  isDisableJobberIdField: boolean;
  isDisableEstimateField: boolean;
}

export const Form = ({
  errors,
  isDisableJobberIdField,
  isDisableEstimateField,
}: Props) => {
  const { watch, register } = useFormContext<EditJobFormData>();

  const isHighlight = watch('isHighlight');

  return (
    <VStack spacing="6" align="flex-start" flex="1" pr="8">
      <RadioGroup
        name="type"
        label="Tipo do Job"
        options={jobTypeOptions}
        error={errors?.type}
      />

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
          <Input registerName="title" label="Título" error={errors?.title} />
        </Box>
      </Flex>

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
        h="180px"
      />

      <RadioGroup
        name="status"
        label="Status do Job"
        options={jobStatusOptions}
        error={errors?.status}
      />

      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="highlight" mb="0" fontWeight="bold">
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
