import React from 'react';
import { Link } from 'react-router-dom';

import {
  Box,
  Flex,
  Link as LinkChakra,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
} from '@chakra-ui/react';

import { Cycle } from '~/@types/cycles';
import { Highlight } from '~/@types/job';
import {
  STATUS_COLORS,
  formatTime,
  getJobStatus,
  getJobType,
  secondsToTime,
  truncateString,
} from '~/helpers/utils';
import { useCycle } from '~/hooks/useCycle';
import { useCyclesContext } from '~/hooks/useCyclesContext';
import { useJobsContext } from '~/hooks/useJobsContext';

import { Pagination } from '../Pagination';

const PageSize = 10;

export const Highlights = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [jobsHighlights, setJobsHighlights] = React.useState<Highlight[]>([]);

  const { jobs } = useJobsContext();
  const { cyclesByUser } = useCyclesContext();
  const { getTotalHoursUsedActiveCycleJob } = useCycle();

  const jobsFiltered = React.useMemo(() => {
    return jobs?.filter((job) => job?.isHighlight);
  }, [jobs]);

  const getJobTotalHoursUsed = React.useCallback(
    (cycles: Cycle[]) => {
      const { totalHoursUsedActiveCycleJob } =
        getTotalHoursUsedActiveCycleJob(cycles);

      const totalHoursUsed = totalHoursUsedActiveCycleJob;

      const { hours, minutes } = secondsToTime(totalHoursUsed);

      return { hours, minutes, totalHoursUsed };
    },
    [getTotalHoursUsedActiveCycleJob],
  );

  const getJobsHighlights = React.useCallback(() => {
    const highlights = [...jobsFiltered]?.map((job) => {
      const cycles = cyclesByUser?.filter((cycle) => cycle?.jobId === job?.id);

      const { hours, minutes, totalHoursUsed } = getJobTotalHoursUsed(cycles);

      const hourEstimate = job?.hourEstimate ?? 0;
      const totalSecondsAmount = job?.totalSecondsAmount ?? 0;
      const minutesEstimate = job?.minutesEstimate ?? 0;
      const estimatedTime = formatTime(hourEstimate, minutesEstimate);

      const status = getJobStatus(job?.status);
      const type = getJobType(job?.type);
      const statusColor =
        totalHoursUsed > totalSecondsAmount
          ? ('red' as const)
          : ('gray' as const);

      return {
        id: job?.id ?? '',
        title: job?.title,
        status,
        type,
        estimatedTime,
        usedTime: {
          time: `${hours}h:${minutes}m`,
          statusColor,
        },
      };
    });

    return { highlights };
  }, [cyclesByUser, jobsFiltered, getJobTotalHoursUsed]);

  React.useEffect(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;

    const { highlights } = getJobsHighlights();

    const highlightsSlice = highlights?.slice(firstPageIndex, lastPageIndex);

    setJobsHighlights(highlightsSlice);
  }, [getJobsHighlights, currentPage]);

  return (
    <>
      {!jobsHighlights.length ? (
        <Text textAlign="center" fontSize="large" mt="10">
          Nenhum resultado encontrado
        </Text>
      ) : (
        <TableContainer>
          <Table colorScheme="blackAlpha">
            <Thead>
              <Tr>
                <Th>Título</Th>
                <Th>Tempo Estimado</Th>
                <Th>Tempo Utilizado</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {jobsHighlights?.map((job) => (
                <Tr key={job?.id}>
                  <Td>
                    <Tooltip label={job?.title} placement="top-start">
                      <LinkChakra as={Link} to={`/jobs/${job?.id}`}>
                        {truncateString(job?.title, 55)}
                      </LinkChakra>
                    </Tooltip>
                  </Td>

                  <Td>{job?.estimatedTime}</Td>

                  <Td>
                    <Text
                      fontSize="md"
                      color={STATUS_COLORS[job?.usedTime?.statusColor]}
                    >
                      {job?.usedTime?.time}
                    </Text>
                  </Td>

                  <Td>
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
                        {job.status.type}
                      </Text>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}

      <Box mt="5">
        <Pagination
          currentPage={currentPage}
          totalCount={jobsFiltered?.length}
          pageSize={PageSize}
          siblingCount={1}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </Box>
    </>
  );
};
