import React from 'react';
import { useParams } from 'react-router-dom';

import { Box, Flex, VStack, Text } from '@chakra-ui/react';

import {
  JobDetail,
  JobReport,
  JobReports as JobReportsType,
} from '~/@types/job';
import { Container } from '~/components/Container';
import { InfoJob } from '~/components/Job/Info';
import { JobProgress } from '~/components/Job/Progress';
import { JobReports } from '~/components/Job/Reports';
import { JobStatus } from '~/components/Job/Status';
import { Title } from '~/components/Title';
import { groupBy } from '~/helpers/utils';
import { getJob, getJobReports } from '~/hooks/useJob';

export const DetailsJobPage = () => {
  const [data, setData] = React.useState<JobDetail | null>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [jobReports, setJobReports] = React.useState<JobReport[]>([]);

  const { id } = useParams();

  const handleGetJobData = React.useCallback(async () => {
    if (id) {
      try {
        setIsLoading(true);

        const [{ job }, { reports }] = await Promise.all([
          getJob(id),
          getJobReports(id),
        ]);

        if (job) {
          setData(job);
        }

        if (reports) {
          const reportsData = groupBy(reports, 'date');

          const formattedJobReports = Object.keys(reportsData).map(
            (key: string) => {
              return {
                date: reportsData[key][0]?.date,
                job_id: reportsData[key][0]?.job_id,
                reports: reportsData[key]?.map(
                  (item: JobReportsType) => item.report,
                ),
              };
            },
          );

          setJobReports(formattedJobReports);
        }

        setIsLoading(false);
      } catch (err) {
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

              <JobReports reports={jobReports} />
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
};
