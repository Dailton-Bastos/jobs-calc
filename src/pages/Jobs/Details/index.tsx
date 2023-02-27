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
  const { job, fetchJob } = useJobsContext();

  React.useEffect(() => {
    if (id) fetchJob(id);
  }, [fetchJob, id]);

  return (
    <Container title="Detalhes do Job" to="/jobs">
      <Box as="section" bg="white" px="8" py="12" borderRadius="5px">
        {job && (
          <>
            <Flex alignItems="center" justifyContent="space-between" gap="8">
              <Box w="100%" maxW="640px">
                <Title>Descrição</Title>

                <VStack spacing="6" mt="8" align="flex-start">
                  <Flex align="center" justify="space-between" w="100%">
                    {job.jobberId && (
                      <InfoJob title="ID:">{job?.jobberId}</InfoJob>
                    )}

                    <InfoJob title="Título:">{job?.title}</InfoJob>
                  </Flex>

                  <Flex align="center" justify="space-between" w="100%">
                    <InfoJob title="Tempo Estimado:">
                      {formatTime(
                        job.hourEstimate ?? 0,
                        job.minutesEstimate ?? 0,
                      )}
                    </InfoJob>

                    <InfoJob title="Tempo utilizado:">
                      {`${job?.hourEstimate}h${job?.minutesEstimate}m`}
                    </InfoJob>
                  </Flex>

                  <Flex align="center" justify="space-between" w="100%">
                    {job.type === 'budget' && (
                      <InfoJob title="Tipo:">Orçamento</InfoJob>
                    )}

                    {job.type === 'development' && (
                      <InfoJob title="Tipo:">Desenvolvimento</InfoJob>
                    )}

                    {job.type === 'other' && (
                      <InfoJob title="Tipo:">Outro</InfoJob>
                    )}

                    {job.status === 'opened' && (
                      <JobStatus statusColor="blue">Em aberto</JobStatus>
                    )}

                    {job.status === 'developing' && (
                      <JobStatus statusColor="yellow">Em andamento</JobStatus>
                    )}

                    {job.status === 'paused' && (
                      <JobStatus statusColor="red">Em espera</JobStatus>
                    )}

                    {job.status === 'done' && (
                      <JobStatus statusColor="green">Concluído</JobStatus>
                    )}
                  </Flex>

                  <Flex align="center" justify="space-between" w="100%">
                    <InfoJob title="Criado em:">
                      {formatDate(job.createdAt)}
                    </InfoJob>

                    <InfoJob title="Última atualização:">
                      {formatDate(job.updatedAt)}
                    </InfoJob>
                  </Flex>

                  <Box>
                    <Text fontWeight="bold">Descrição:</Text>

                    <Text fontSize="md">{job?.description}</Text>
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

                <NewCycleForm job={job} />
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
