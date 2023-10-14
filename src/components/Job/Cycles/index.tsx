import React from 'react';

import {
  Flex,
  VStack,
  Text,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
} from '@chakra-ui/react';

import type { JobFormatted } from '~/@types/job';
import { Pagination } from '~/components/Pagination';

import { JobTime } from '../Time';

interface Props {
  job: JobFormatted;
}

export const Cycles = ({ job }: Props) => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const PAGE_SIZE = 3;

  const totalReports = React.useMemo(() => {
    const initialValue = 0;

    return job?.reports?.reduce((accumulator, currentValue) => {
      return accumulator + currentValue?.cycles?.length;
    }, initialValue);
  }, [job]);

  const totalCount = React.useMemo(() => job?.reports?.length, [job]);

  const reports = React.useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PAGE_SIZE;
    const lastPageIndex = firstPageIndex + PAGE_SIZE;

    return job?.reports.slice(firstPageIndex, lastPageIndex);
  }, [job, currentPage]);

  return (
    <TableContainer mt="10">
      <Table colorScheme="blackAlpha">
        <TableCaption>
          <Flex align="center" justify="space-between">
            <Box>
              <Text fontWeight="bold">
                Horas:{' '}
                <Text as="span" fontWeight="normal">
                  {job?.usedTime.total}
                </Text>
              </Text>
            </Box>

            <Box>
              <Text fontWeight="bold">
                Apontamentos:{' '}
                <Text as="span" fontWeight="normal">
                  {totalReports}
                </Text>
              </Text>
            </Box>
          </Flex>
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Data</Th>
            <Th>Intervalo</Th>
            <Th>Horas</Th>
            <Th>Total Hora</Th>
          </Tr>
        </Thead>
        <Tbody>
          {reports?.map((report) => (
            <Tr key={report?.id}>
              <Td>
                <JobTime
                  label={report?.date.label}
                  dateTime={report?.date.datetime}
                >
                  {report?.date.title}
                </JobTime>
              </Td>

              <Td>
                <VStack spacing="2" align="flex-start">
                  {report?.cycles?.map((cycle) => (
                    <Text key={cycle.id}>
                      <Text as="time">{cycle.startHour}</Text> -{' '}
                      <Text as="time">{cycle.finishedHour}</Text>
                    </Text>
                  ))}
                </VStack>
              </Td>

              <Td>
                <VStack spacing="2" align="flex-start">
                  {report?.cycles?.map((cycle) => (
                    <Text key={cycle.id}>{cycle.total}</Text>
                  ))}
                </VStack>
              </Td>

              <Td>{report.totalUsedTime}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Pagination
        currentPage={currentPage}
        totalCount={totalCount}
        pageSize={PAGE_SIZE}
        siblingCount={1}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </TableContainer>
  );
};
