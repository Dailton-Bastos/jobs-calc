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
  useColorModeValue,
} from '@chakra-ui/react';

import { Pagination } from '~/components/Pagination';
import { STATUS_COLORS } from '~/helpers/utils';
import { useCyclesContext } from '~/hooks/useCyclesContext';

import { Actions } from './Actions';

const PageSize = 10;

const ListJobs = () => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const { jobs: data } = useCyclesContext();

  const totalCount = React.useMemo(() => data?.length, [data]);

  const tableBg = useColorModeValue('secondary.light', 'whiteAlpha.400');
  const trBg = useColorModeValue('blackAlpha.900', 'secondary.dark');

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
      <TableContainer mt="6">
        <Table
          colorScheme="blackAlpha"
          bg={tableBg}
          borderRadius="lg"
          overflow="hidden"
          boxShadow="base"
        >
          <TableCaption>
            <Flex gap="2" align="center" justify="flex-end">
              <Text fontWeight="bold">Total de jobs:</Text>
              <Text>{totalCount}</Text>
            </Flex>
          </TableCaption>

          <Thead>
            <Tr bg={trBg}>
              <Th textTransform="capitalize" fontSize="md" color="white">
                Título
              </Th>
              <Th textTransform="capitalize" fontSize="md" color="white">
                Tipo
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
            {jobs?.map((job) => (
              <Tr key={job.id}>
                <Td fontWeight="bold" pt="2" pb="2" color="variant">
                  <Tooltip label={job?.title?.fullTitle} placement="top-start">
                    <LinkChakra as={Link} to={`/jobs/${job?.id}`}>
                      {job?.title?.shortTitle}
                    </LinkChakra>
                  </Tooltip>
                </Td>

                <Td pt="2" pb="2" color="variant">
                  {job.type}
                </Td>

                <Td pt="2" pb="2" color="variant">
                  <Text>{job.estimatedTime?.total}</Text>
                </Td>

                <Td pt="2" pb="2" color="variant">
                  <Text
                    fontSize="md"
                    color={STATUS_COLORS[job?.usedTime?.statusColor]}
                  >
                    {job?.usedTime?.total}
                  </Text>
                </Td>

                <Td pt="2" pb="2" color="variant">
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
