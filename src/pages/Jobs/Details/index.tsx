import React from 'react';
import { useParams } from 'react-router-dom';

import { Flex, Box, VStack, Text } from '@chakra-ui/react';
import { ref, onValue, query, orderByChild, equalTo } from 'firebase/database';

import { Job } from '~/@types/job';
import { Container } from '~/components/Container';
import { InfoJob } from '~/components/Job/Info';
import { JobProgress } from '~/components/Job/Progress';
import { JobStatus } from '~/components/Job/Status';
import { Title } from '~/components/Title';
import { db } from '~/config/firebase';
import { formatTime, formatDate } from '~/helpers/utils';

export const DetailsJobPage = () => {
  const [job, setJob] = React.useState<Job | null>(null);

  const { id } = useParams();

  const onFetchJob = React.useCallback(() => {
    if (!id) return;

    const jobRef = query(ref(db, 'jobs'), orderByChild('id'), equalTo(id));

    onValue(jobRef, (snapshot) => {
      if (snapshot && snapshot.exists()) {
        const data = snapshot.val();

        for (const key in data) {
          setJob({ ...data[key] });
        }
      }
    });
  }, [id]);

  React.useEffect(() => {
    onFetchJob();
  }, [onFetchJob]);

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

              <JobProgress />
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
