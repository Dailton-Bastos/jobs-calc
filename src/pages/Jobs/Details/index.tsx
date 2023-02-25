// import React from 'react';
// import { useParams } from 'react-router-dom';

import { Box } from '@chakra-ui/react';

// import { JobReports as JobReportsType, JobReport } from '~/@types/job';
import { Container } from '~/components/Container';
// import { InfoJob } from '~/components/Job/Info';
// import { JobProgress } from '~/components/Job/Progress';
// import { JobReports } from '~/components/Job/Reports';
// import { JobStatus } from '~/components/Job/Status';
// import { Title } from '~/components/Title';
// import { groupBy } from '~/helpers/utils';
// import { useJobReports, useFormattedHour } from '~/hooks/useJob';

export const DetailsJobPage = () => {
  // const [data, setData] = React.useState<JobDetail | null>();
  // const [isLoading, setIsLoading] = React.useState(false);
  // const [jobReports, setJobReports] = React.useState<JobReportsType[]>([]);

  // const { id } = useParams();

  // const { reportList } = useJobReports(id as string);

  // const handleGetJobData = React.useCallback(async () => {
  //   if (id) {
  //     try {
  //       setIsLoading(true);

  //       const { job } = await getJob(id);

  //       if (job) {
  //         setData(job);
  //       }

  //       setIsLoading(false);
  //     } catch (err) {
  //       throw new Error('Error fetch job');
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  // }, [id]);

  // const totalHourJob = React.useMemo(() => {
  //   return jobReports.reduce((acc, item) => acc + item.totalHours, 0);
  // }, [jobReports]);

  // const { formattedHour } = useFormattedHour(totalHourJob);

  // React.useEffect(() => {
  //   handleGetJobData();
  // }, [handleGetJobData]);

  // React.useEffect(() => {
  //   const reportsList = groupBy(reportList, 'date');

  //   const formattedJobReports = Object.keys(reportsList).map((key: string) => {
  //     return {
  //       id: reportsList[key][0]?.id,
  //       date: reportsList[key][0]?.date,
  //       job_id: reportsList[key][0]?.job_id,
  //       reports: reportsList[key]?.map((item: JobReport) => item.report),
  //       totalHours: reportsList[key]?.reduce((acc: number, item: JobReport) => {
  //         return (
  //           acc +
  //           item?.report?.duration?.hours * 60 * 60 +
  //           item?.report?.duration?.minutes * 60 +
  //           item?.report?.duration?.seconds
  //         );
  //       }, 0),
  //     };
  //   });

  //   setJobReports(formattedJobReports);
  // }, [reportList]);

  return (
    <Container title="Detalhes do Job" to="/jobs">
      <Box as="section" bg="white" px="8" py="12" borderRadius="5px">
        {/* {isLoading && <p>Carregando...</p>}

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

                    <InfoJob title="Tempo utilizado:">{formattedHour}</InfoJob>
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

              <JobProgress />
            </Flex>

            <Box mt="12">
              <Title>Apontamentos</Title>

              <JobReports reports={jobReports} totalHourJob={totalHourJob} />
            </Box>
          </>
        )} */}
      </Box>
    </Container>
  );
};
