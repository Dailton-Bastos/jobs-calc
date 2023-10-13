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
} from '@chakra-ui/react';

import type { Report } from '~/@types/job';

import { JobTime } from '../Time';

interface Props {
  reports: Report[];
}

export const Cycles = ({ reports }: Props) => {
  const totalReports = React.useMemo(() => {
    const initialValue = 0;

    return reports?.reduce((accumulator, currentValue) => {
      return accumulator + currentValue?.cycles?.length;
    }, initialValue);
  }, [reports]);

  return (
    <TableContainer mt="10">
      <Table colorScheme="blackAlpha">
        <TableCaption>
          <Flex gap="2" align="center" justify="flex-end">
            <Text fontWeight="bold">Total:</Text>
            <Text>{totalReports}</Text>
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
                      <Text as="time">{cycle.fineshedHour}</Text>
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
    </TableContainer>
  );
};
