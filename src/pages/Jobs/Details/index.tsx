import React from 'react';
import { useParams } from 'react-router-dom';

import { Flex, Box, VStack, Text } from '@chakra-ui/react';

import { Container } from '~/components/Container';
import { Countdown } from '~/components/Job/Countdown';
import { InfoJob } from '~/components/Job/Info';
import { NewCycleForm } from '~/components/Job/NewCycleForm';
import { JobStatus } from '~/components/Job/Status';
import { Title } from '~/components/Title';
import { formatTime, formatDate } from '~/helpers/utils';
import { useJobsContext } from '~/hooks/useJobsContext';

export const DetailsJobPage = () => {
  const { id } = useParams();
  const { activeJob, fetchJob } = useJobsContext();

  React.useEffect(() => {
    if (id) fetchJob(id);
  }, [fetchJob, id]);

  return (
    <Container title="Detalhes do Job" to="/jobs">
      <Box as="section" bg="white" px="8" py="12" borderRadius="5px">
        {activeJob && (
          <>
            <Flex alignItems="center" justifyContent="space-between" gap="8">
              <Box w="100%" maxW="640px">
                <Title>Descrição</Title>

                <VStack spacing="6" mt="8" align="flex-start">
                  <Flex align="center" justify="space-between" w="100%">
                    {activeJob.jobberId && (
                      <InfoJob title="ID:">{activeJob?.jobberId}</InfoJob>
                    )}

                    <InfoJob title="Título:">{activeJob?.title}</InfoJob>
                  </Flex>

                  <Flex align="center" justify="space-between" w="100%">
                    <InfoJob title="Tempo Estimado:">
                      {formatTime(
                        activeJob.hourEstimate ?? 0,
                        activeJob.minutesEstimate ?? 0,
                      )}
                    </InfoJob>

                    <InfoJob title="Tempo utilizado:">
                      {`${activeJob?.hourEstimate}h${activeJob?.minutesEstimate}m`}
                    </InfoJob>
                  </Flex>

                  <Flex align="center" justify="space-between" w="100%">
                    {activeJob.type === 'budget' && (
                      <InfoJob title="Tipo:">Orçamento</InfoJob>
                    )}

                    {activeJob.type === 'development' && (
                      <InfoJob title="Tipo:">Desenvolvimento</InfoJob>
                    )}

                    {activeJob.type === 'other' && (
                      <InfoJob title="Tipo:">Outro</InfoJob>
                    )}

                    {activeJob.status === 'opened' && (
                      <JobStatus statusColor="blue">Em aberto</JobStatus>
                    )}

                    {activeJob.status === 'developing' && (
                      <JobStatus statusColor="yellow">Em andamento</JobStatus>
                    )}

                    {activeJob.status === 'paused' && (
                      <JobStatus statusColor="red">Em espera</JobStatus>
                    )}

                    {activeJob.status === 'done' && (
                      <JobStatus statusColor="green">Concluído</JobStatus>
                    )}
                  </Flex>

                  <Flex align="center" justify="space-between" w="100%">
                    {activeJob?.createdAt && (
                      <InfoJob title="Criado em:">
                        {formatDate(activeJob.createdAt)}
                      </InfoJob>
                    )}

                    {activeJob?.updatedAt && (
                      <InfoJob title="Última atualização:">
                        {formatDate(activeJob.updatedAt)}
                      </InfoJob>
                    )}
                  </Flex>

                  <Box>
                    <Text fontWeight="bold">Descrição:</Text>

                    <Text fontSize="md">{activeJob?.description}</Text>
                  </Box>
                </VStack>
              </Box>

              <Flex
                direction="column"
                alignItems="center"
                justifyContent="center"
                bg="white"
                boxShadow="lg"
                borderRadius="5px"
                py="6"
                px="12"
                w="100%"
                maxW="352px"
              >
                <Countdown />

                <NewCycleForm />
              </Flex>
            </Flex>

            {/* <Box mt="12">
              <Title>Apontamentos</Title>

              <JobReports reports={jobReports} totalHourJob={totalHourJob} />
            </Box> */}
          </>
        )}
      </Box>
    </Container>
  );
};
