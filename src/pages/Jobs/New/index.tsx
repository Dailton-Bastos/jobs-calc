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

import { Container } from '~/components/Container';
import { Input } from '~/components/Form/Input';
import { InputNumber } from '~/components/Form/InputNumber';
import { Label } from '~/components/Form/Label';
import { Select } from '~/components/Form/Select';
import { Hour } from '~/components/Job/Hour';
import { Title } from '~/components/Title';

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
  return (
    <Container title="Adicionar Novo Job">
      <Box as="section">
        <Flex
          as="form"
          alignItems="center"
          justifyContent="space-between"
          gap="8"
        >
          <Box w="100%" maxW="640px">
            <Title>Dados do Job</Title>

            <Box mt="8">
              <VStack spacing="6" align="flex-start">
                <Grid gap="6" templateColumns="140px 1fr" w="100%">
                  <GridItem w="100%">
                    <InputNumber name="job_id" label="ID no Jobber" />
                  </GridItem>

                  <GridItem w="100%">
                    <Input name="job_title" label="Título do Job" />
                  </GridItem>
                </Grid>

                <Grid gap="6" templateColumns="repeat(2, 1fr)" w="100%">
                  <Select
                    name="job_type"
                    label="Tipo do Job"
                    options={jobTypes}
                  />

                  <InputNumber
                    name="job_estimate"
                    label="Tempo Estimado"
                    max={100}
                    min={1}
                    stepper
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

          <Hour />
        </Flex>
      </Box>
    </Container>
  );
};
