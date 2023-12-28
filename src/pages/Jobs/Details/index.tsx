import React from 'react';
import { useParams } from 'react-router-dom';

import { Flex, Box, VStack, Text } from '@chakra-ui/react';

import { Countdown } from '~/components/Job/Countdown';
import { Cycles } from '~/components/Job/Cycles';
import { InfoJob } from '~/components/Job/Info';
import { JobTime } from '~/components/Job/Time';
import { Title } from '~/components/Title';
import { STATUS_COLORS } from '~/helpers/utils';
import { useJobs } from '~/hooks/useJobs';
import { userTitle } from '~/Layouts/Main/hooks/useTitle';

export const DetailsJobPage = () => {
  const { id } = useParams();

  const { getJobById } = useJobs();

  const setPageTitle = userTitle((state) => state.setpageTitle);
  const setHeaderTitle = userTitle((state) => state.setHeaderTitle);

  const job = React.useMemo(() => getJobById(id), [getJobById, id]);

  React.useEffect(() => {
    setHeaderTitle('Detalhes do job');

    if (job) {
      setPageTitle(job?.title.fullTitle);
    }
  }, [setHeaderTitle, job, setPageTitle]);

  if (!job) return <></>;

  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between" gap="8">
        <Box w="100%" maxW="640px">
          <Title
            title="Descrição"
            label="Editar Descrição"
            url={`/jobs/${job?.id}/edit`}
            withTooltip
          />

          <VStack spacing="6" mt="8" align="flex-start">
            <Flex align="center" justify="space-between" w="100%">
              {job.jobberId && (
                <InfoJob title="Jobber ID">
                  <a
                    href={`https://jobber.team/jobs/details/${job.jobberId}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Text as="span">{job.jobberId}</Text>
                  </a>
                </InfoJob>
              )}

              <InfoJob title="Título">
                <Text as="span">{job?.title.fullTitle}</Text>
              </InfoJob>
            </Flex>

            <Flex align="center" justify="space-between" w="100%">
              <InfoJob title="Tempo estimado">
                <Text as="span">{job.estimatedTime?.total}</Text>
              </InfoJob>

              <InfoJob
                title="Tempo utilizado"
                statusColor={job.usedTime.statusColor}
              >
                <Text as="span">{job.usedTime.total}</Text>
              </InfoJob>
            </Flex>

            <Flex align="center" justify="space-between" w="100%">
              <InfoJob title="Tipo">
                <Text as="span">{job.type}</Text>
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
                    bg={STATUS_COLORS[job.status.statusColor]}
                  />

                  <Text
                    fontSize="md"
                    color={STATUS_COLORS[job.status.statusColor]}
                  >
                    {job.status.title}
                  </Text>
                </Flex>
              </Box>
            </Flex>

            <Flex align="center" justify="space-between" w="100%">
              <InfoJob title="Criado em">
                <JobTime
                  label={job.createdAt.label}
                  dateTime={job.createdAt.datetime}
                >
                  {job.createdAt.title}
                </JobTime>
              </InfoJob>

              <InfoJob title="Última atualização">
                <JobTime
                  label={job.updatedAt.label}
                  dateTime={job.updatedAt.datetime}
                >
                  {job.updatedAt.title}
                </JobTime>
              </InfoJob>
            </Flex>

            <Box>
              <Text fontWeight="bold">Briefing</Text>

              <Text fontSize="md">{job.description}</Text>
            </Box>
          </VStack>
        </Box>

        <Countdown job={job} />
      </Flex>

      <Box mt="12">
        <Title
          title="Apontamentos"
          label="Editar Apontamentos"
          url={`/jobs/${id}/cycles`}
          withTooltip
        />

        <Cycles job={job} />
      </Box>
    </Box>
  );
};
