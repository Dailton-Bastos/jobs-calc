import React from 'react';
import { useParams } from 'react-router-dom';

import {
  Box,
  Flex,
  VStack,
  Text,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';

import { JobDetail } from '~/@types/job';
import { Container } from '~/components/Container';
import { InfoJob } from '~/components/Job/Info';
import { JobProgress } from '~/components/Job/Progress';
import { JobStatus } from '~/components/Job/Status';
import { Title } from '~/components/Title';
import { getJob } from '~/hooks/useJob';

export const DetailsJobPage = () => {
  const [data, setData] = React.useState<JobDetail | null>();
  const [isLoading, setIsLoading] = React.useState(false);

  const { id } = useParams();

  const handleGetJobData = React.useCallback(async () => {
    if (id) {
      try {
        setIsLoading(true);
        const { job } = await getJob(id);

        setData(job);
        setIsLoading(false);
      } catch (_) {
        throw new Error('Error fetch job');
      } finally {
        setIsLoading(false);
      }
    }
  }, [id]);

  React.useEffect(() => {
    handleGetJobData();
  }, [handleGetJobData]);

  return (
    <Container title="Detalhes do Job">
      <Box as="section" bg="white" px="8" py="12" borderRadius="5px">
        {isLoading && <p>Carregando...</p>}

        {data && (
          <>
            <Flex alignItems="center" justifyContent="space-between" gap="8">
              <Box w="100%" maxW="640px">
                <Title>Descrição</Title>

                <VStack spacing="6" mt="8" align="flex-start">
                  <Flex align="center" justify="space-between" w="100%">
                    {data.id && <InfoJob title="ID:">{data?.id}</InfoJob>}

                    <InfoJob title="Título:">{data.title}</InfoJob>
                  </Flex>

                  <Flex align="center" justify="space-between" w="100%">
                    <InfoJob title="Tempo Estimado:">{data.estimate}</InfoJob>

                    <InfoJob title="Tempo utilizado:">00h:00m</InfoJob>
                  </Flex>

                  <Flex align="center" justify="space-between" w="100%">
                    <InfoJob title="Tipo:">{data.type}</InfoJob>

                    <JobStatus color={data.status.color}>
                      {data.status.title}
                    </JobStatus>
                  </Flex>

                  <Flex align="center" justify="space-between" w="100%">
                    <InfoJob title="Criado em:">{data.createdAt}</InfoJob>

                    <InfoJob title="Última atualização:">
                      {data.updatedAt}
                    </InfoJob>
                  </Flex>

                  {data.briefing && (
                    <Box>
                      <Text fontWeight="bold">Briefing:</Text>

                      <Text fontSize="md">{data.briefing}</Text>
                    </Box>
                  )}
                </VStack>
              </Box>

              <JobProgress
                estimateTotalSeconds={data.estimateTotalSeconds}
                uid={id as string}
              />
            </Flex>

            <Box mt="12">
              <Title>Apontamentos</Title>

              <TableContainer mt="10">
                <Table colorScheme="blackAlpha">
                  <TableCaption>
                    <Flex gap="2" align="center" justify="flex-end">
                      <Text fontWeight="bold">Total de horas:</Text>
                      <Text>07h:30m</Text>
                    </Flex>
                  </TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Data</Th>
                      <Th>Intervalo</Th>
                      <Th>Horas</Th>
                      <Th>Total Hora</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>09 setembro 2022</Td>

                      <Td>
                        <VStack spacing="2" align="flex-start">
                          <Text>09:00 - 12:20</Text>
                          <Text>15:25 - 16:30</Text>
                        </VStack>
                      </Td>

                      <Td>
                        <VStack spacing="2" align="flex-start">
                          <Text>3h:20m</Text>
                          <Text>1h:55m</Text>
                        </VStack>
                      </Td>

                      <Td>5h:15m</Td>
                    </Tr>

                    <Tr>
                      <Td>12 setembro 2022</Td>

                      <Td>
                        <VStack spacing="2" align="flex-start">
                          <Text>10:45 - 11:30</Text>
                          <Text>11:30 - 12:00</Text>
                        </VStack>
                      </Td>

                      <Td>
                        <VStack spacing="2" align="flex-start">
                          <Text>1h:20m</Text>
                          <Text>0h:55m</Text>
                        </VStack>
                      </Td>

                      <Td>2h:15m</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
};
