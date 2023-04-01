import React from 'react';
import { useParams } from 'react-router-dom';

import { Flex, Box, VStack, Text } from '@chakra-ui/react';

import { ActiveCycleInfo } from '~/components/ActiveCycleInfo';
import { Container } from '~/components/Container';
import { Head } from '~/components/Head';
import { Countdown } from '~/components/Job/Countdown';
import { Cycles } from '~/components/Job/Cycles';
import { InfoJob } from '~/components/Job/Info';
import { JobTime } from '~/components/Job/Time';
import { Title } from '~/components/Title';
import { STATUS_COLORS } from '~/helpers/utils';
import { useCyclesContext } from '~/hooks/useCyclesContext';
import { useJobsContext } from '~/hooks/useJobsContext';

export const DetailsJobPage = () => {
  const { id } = useParams();

  const { jobs, activeJob, updateActiveJob } = useJobsContext();

  const { activeCycleInfo, jobInfo, countdownText } = useCyclesContext();

  const pageTitle = `${countdownText} - ${activeJob?.title}`;

  const showActiveCycleInfo = activeJob?.id !== activeCycleInfo?.jobId;

  React.useEffect(() => {
    const job = jobs?.find((item) => item.id === id);

    if (job) {
      updateActiveJob(job);
    }
  }, [jobs, updateActiveJob, id]);

  return (
    <>
      <Head title={pageTitle} />

      <Container title="Detalhes do Job" to="/jobs">
        <>
          {showActiveCycleInfo && <ActiveCycleInfo />}

          <Box as="section" bg="white" px="8" py="12" borderRadius="5px">
            {jobInfo && (
              <>
                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  gap="8"
                >
                  <Box w="100%" maxW="640px">
                    <Title>Descrição</Title>

                    <VStack spacing="6" mt="8" align="flex-start">
                      <Flex align="center" justify="space-between" w="100%">
                        {jobInfo.jobberId && (
                          <InfoJob title="Jobber ID">
                            <Text as="span">{jobInfo.jobberId}</Text>
                          </InfoJob>
                        )}

                        <InfoJob title="Título">
                          <Text as="span">{activeJob?.title}</Text>
                        </InfoJob>
                      </Flex>

                      <Flex align="center" justify="space-between" w="100%">
                        <InfoJob title="Tempo Estimado">
                          <Text as="span">{jobInfo.estimatedTime}</Text>
                        </InfoJob>

                        <InfoJob
                          title="Tempo utilizado"
                          statusColor={jobInfo.usedTime.statusColor}
                        >
                          <Text as="span">{jobInfo.usedTime.time}</Text>
                        </InfoJob>
                      </Flex>

                      <Flex align="center" justify="space-between" w="100%">
                        <InfoJob title="Tipo">
                          <Text as="span">{jobInfo.type}</Text>
                        </InfoJob>

                        <Box w="100%">
                          <Text fontWeight="bold" mb="2">
                            Status
                          </Text>
                          <Flex gap="2" align="center" justify="flex-start">
                            <Box
                              w="8px"
                              h="8px"
                              borderRadius="50%"
                              bg={STATUS_COLORS[jobInfo.status.statusColor]}
                            />

                            <Text
                              fontSize="md"
                              color={STATUS_COLORS[jobInfo.status.statusColor]}
                            >
                              {jobInfo.status.type}
                            </Text>
                          </Flex>
                        </Box>
                      </Flex>

                      <Flex align="center" justify="space-between" w="100%">
                        <InfoJob title="Criado em">
                          <JobTime
                            label={jobInfo.createdAt.label}
                            dateTime={jobInfo.createdAt.dateTime}
                          >
                            {jobInfo.createdAt.title}
                          </JobTime>
                        </InfoJob>

                        <InfoJob title="Última atualização">
                          <JobTime
                            label={jobInfo.updatedAt.label}
                            dateTime={jobInfo.updatedAt.dateTime}
                          >
                            {jobInfo.updatedAt.title}
                          </JobTime>
                        </InfoJob>
                      </Flex>

                      <Box>
                        <Text fontWeight="bold">Briefing</Text>

                        <Text fontSize="md">{jobInfo.description}</Text>
                      </Box>
                    </VStack>
                  </Box>

                  <Countdown />
                </Flex>

                <Box mt="12">
                  <Title>Apontamentos</Title>

                  <Cycles />
                </Box>
              </>
            )}
          </Box>
        </>
      </Container>
    </>
  );
};
