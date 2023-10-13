import React from 'react';
import { Link } from 'react-router-dom';

import {
  Box,
  Flex,
  Text,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tooltip,
  Link as LinkChakra,
} from '@chakra-ui/react';

import { Pagination } from '~/components/Pagination';
import { STATUS_COLORS } from '~/helpers/utils';
import { useJobsContext } from '~/hooks/useJobsContext';

import { Actions } from './Actions';

const PageSize = 7;

const ListJobs = () => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const { jobs: data } = useJobsContext();

  const totalCount = React.useMemo(() => data?.length, [data]);

  const jobs = React.useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;

    return data.slice(firstPageIndex, lastPageIndex);
  }, [data, currentPage]);

  if (!jobs.length) {
    return (
      <Text textAlign="center" fontSize="large" mt="10">
        Nenhum job encontrado
      </Text>
    );
  }

  return (
    <>
      <TableContainer mt="10">
        <Table variant="simple">
          <TableCaption>
            <Flex gap="2" align="center" justify="flex-end">
              <Text fontWeight="bold">Total de jobs:</Text>
              <Text>{totalCount}</Text>
            </Flex>
          </TableCaption>

          <Thead>
            <Tr>
              <Th>Título</Th>
              <Th>Tipo</Th>
              <Th>Tempo Estimado</Th>
              <Th>Tempo Utilizado</Th>
              <Th>Status</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {jobs?.map((job) => (
              <Tr key={job.id}>
                <Td>
                  <Tooltip label={job?.title?.fullTitle} placement="top-start">
                    <LinkChakra as={Link} to={`/jobs/${job?.id}`}>
                      {job?.title?.shortTitle}
                    </LinkChakra>
                  </Tooltip>
                </Td>

                <Td>{job.type}</Td>

                <Td>
                  <Text>{job.estimatedTime?.total}</Text>
                </Td>

                <Td>
                  <Text
                    fontSize="md"
                    color={STATUS_COLORS[job?.usedTime?.statusColor]}
                  >
                    {job?.usedTime?.total}
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
                      {job.status.title}
                    </Text>
                  </Flex>
                </Td>

                <Td>
                  <Actions job={job} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Pagination
        currentPage={currentPage}
        totalCount={totalCount}
        pageSize={PageSize}
        siblingCount={1}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
};

export default ListJobs;
