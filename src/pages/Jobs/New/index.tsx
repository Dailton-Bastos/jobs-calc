import {
  Box,
  Flex,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Textarea,
  VStack,
  Text,
} from '@chakra-ui/react';

import { Container } from '~/components/Container';
import { Hour } from '~/components/Job/Hour';
import { Title } from '~/components/Title';

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
                    <FormControl>
                      <FormLabel mb="4" fontWeight="500" lineHeight="6">
                        ID no Jobber
                      </FormLabel>
                      <NumberInput>
                        <NumberInputField
                          bg="white"
                          h="12"
                          _focusVisible={{
                            borderColor: 'gray.500',
                          }}
                        />
                      </NumberInput>
                    </FormControl>
                  </GridItem>

                  <GridItem w="100%">
                    <FormControl>
                      <FormLabel mb="4" fontWeight="500" lineHeight="6">
                        Nome do Job
                      </FormLabel>
                      <Input
                        type="text"
                        bg="white"
                        h="12"
                        _focusVisible={{
                          borderColor: 'gray.500',
                        }}
                      />
                    </FormControl>
                  </GridItem>
                </Grid>

                <Grid gap="6" templateColumns="repeat(2, 1fr)" w="100%">
                  <FormControl>
                    <FormLabel mb="4" fontWeight="500" lineHeight="6">
                      Tipo do Job
                    </FormLabel>
                    <Select
                      bg="white"
                      h="12"
                      defaultValue=""
                      _focusVisible={{
                        borderColor: 'gray.500',
                      }}
                    >
                      <option value="" disabled>
                        Selecione
                      </option>
                      <option>Orçamento</option>
                      <option>Desenvolvimento</option>
                      <option>Outro</option>
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel mb="4" fontWeight="500" lineHeight="6">
                      Estimativa de Horas
                    </FormLabel>
                    <NumberInput max={100} min={1}>
                      <NumberInputField
                        bg="white"
                        h="12"
                        _focusVisible={{
                          borderColor: 'gray.500',
                        }}
                      />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                </Grid>

                <FormControl mb="4" fontWeight="500" lineHeight="6">
                  <FormLabel>
                    Descrição{' '}
                    <Text as="span" fontSize="small">
                      (Opcional)
                    </Text>
                  </FormLabel>
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
