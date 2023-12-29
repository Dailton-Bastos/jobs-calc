import React from 'react';
import { RiUnpinLine } from 'react-icons/ri';
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
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';

import { STATUS_COLORS } from '~/helpers/utils';
import { useCyclesContext } from '~/hooks/useCyclesContext';
import { useJobs } from '~/hooks/useJobs';
import { useJobsContext } from '~/hooks/useJobsContext';

import { Pagination } from '../Pagination';

const PageSize = 10;

export const Highlights = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);

  const { jobs: data } = useCyclesContext();
  const { updateJob } = useJobs();
  const { jobsData } = useJobsContext();

  const tableBg = useColorModeValue('secondary.light', 'whiteAlpha.400');
  const trBg = useColorModeValue('blackAlpha.900', 'secondary.dark');
  const iconColor = useColorModeValue('#4A5568', '#fff');

  const totalCount = React.useMemo(() => {
    return data?.filter((job) => job?.isHighlight)?.length;
  }, [data]);

  const jobsHighlights = React.useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;

    return data
      ?.filter((job) => job?.isHighlight)
      .slice(firstPageIndex, lastPageIndex);
  }, [data, currentPage]);

  const handleRemoveHighlight = React.useCallback(
    async (id: string) => {
      const job = jobsData?.find((item) => item.id === id);

      if (!job) return;

      try {
        setIsLoading(true);

        await updateJob({
          ...job,
          isHighlight: false,
        });
      } catch (error) {
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    },
    [updateJob, jobsData],
  );

  if (totalCount < 1) {
    return (
      <Text textAlign="center" fontSize="large" mt="10">
        Nenhum resultado encontrado
      </Text>
    );
  }

  return (
    <>
      <TableContainer mt="6">
        <Table
          colorScheme="blackAlpha"
          bg={tableBg}
          borderRadius="lg"
          overflow="hidden"
          boxShadow="base"
        >
          <Thead>
            <Tr bg={trBg}>
              <Th textTransform="capitalize" fontSize="md" color="white">
                Título
              </Th>
              <Th textTransform="capitalize" fontSize="md" color="white">
                Tempo Estimado
              </Th>
              <Th textTransform="capitalize" fontSize="md" color="white">
                Tempo Utilizado
              </Th>
              <Th textTransform="capitalize" fontSize="md" color="white">
                Status
              </Th>
              <Th textTransform="capitalize" fontSize="md" color="white">
                Ações
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {jobsHighlights?.map((job) => (
              <Tr key={job?.id}>
                <Td fontWeight="bold" color="variant">
                  <Tooltip label={job?.title?.fullTitle} placement="top-start">
                    <LinkChakra as={Link} to={`/jobs/${job?.id}`}>
                      {job?.title?.shortTitle}
                    </LinkChakra>
                  </Tooltip>
                </Td>

                <Td color="variant">{job?.estimatedTime?.total}</Td>

                <Td color="variant">
                  <Text
                    fontSize="md"
                    color={STATUS_COLORS[job?.usedTime?.statusColor]}
                  >
                    {job?.usedTime?.total}
                  </Text>
                </Td>

                <Td color="variant">
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
                </Td>

                <Td pt="2" pb="2" color="variant">
                  <Tooltip label="Remover Destaque" hasArrow arrowSize={15}>
                    <IconButton
                      aria-label="Remover Destaque"
                      icon={<RiUnpinLine size={22} color={iconColor} />}
                      bg="transparent"
                      onClick={() => handleRemoveHighlight(job.id)}
                      disabled={isLoading}
                    />
                  </Tooltip>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Box mt="5">
        <Pagination
          currentPage={currentPage}
          totalCount={totalCount}
          pageSize={PageSize}
          siblingCount={1}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </Box>
    </>
  );
};
