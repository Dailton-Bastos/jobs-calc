import React from 'react';
import { RiEyeLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import {
  Box,
  Flex,
  Link as LinkChakra,
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
} from '@chakra-ui/react';

import { JobResum } from '~/@types/job';
import { Pagination } from '~/components/Pagination';
import { STATUS_COLORS, truncateString } from '~/helpers/utils';
import { useJobsContext } from '~/hooks/useJobsContext';

const PageSize = 8;

export const ListJobs = () => {
  const [jobs, setJobs] = React.useState<JobResum[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);

  const { myJobs } = useJobsContext();

  React.useEffect(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;

    const jobsSlice = myJobs?.slice(firstPageIndex, lastPageIndex);

    setJobs(jobsSlice);
  }, [myJobs, currentPage]);

  return (
    <>
      {!jobs.length ? (
        <Text textAlign="center" fontSize="large" mt="10">
          Nenhum resultado encontrado
        </Text>
      ) : (
        <TableContainer mt="10">
          <Table variant="simple">
            <TableCaption>
              <Flex gap="2" align="center" justify="flex-end">
                <Text fontWeight="bold">Total de jobs:</Text>
                <Text>{myJobs?.length}</Text>
              </Flex>
            </TableCaption>

            <Thead>
              <Tr>
                <Th>Título</Th>
                <Th>Tipo</Th>
                <Th>Tempo Estimado</Th>
                <Th>Status</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {jobs?.map((job) => (
                <Tr key={job.id}>
                  <Td>
                    <Tooltip label={job.title} placement="top-start">
                      {truncateString(job.title, 50)}
                    </Tooltip>
                  </Td>

                  <Td>{job.type}</Td>

                  <Td>
                    <Text>{job.estimatedTime}</Text>
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

                  <Td>
                    <LinkChakra
                      as={Link}
                      to={`/jobs/${job.id}`}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      p="2"
                      title="Visualizar"
                    >
                      <RiEyeLine size={22} />
                    </LinkChakra>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}

      <Pagination
        currentPage={currentPage}
        totalCount={myJobs?.length}
        pageSize={PageSize}
        siblingCount={1}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
};
