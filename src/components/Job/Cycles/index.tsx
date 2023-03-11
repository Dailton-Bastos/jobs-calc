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

import { CycleByDate } from '~/@types/cycles';

interface Props {
  totalHours: string;
  cyclesByDate: CycleByDate[];
}

export const Cycles = ({ totalHours, cyclesByDate }: Props) => {
  return (
    <TableContainer mt="10">
      <Table colorScheme="blackAlpha">
        <TableCaption>
          <Flex gap="2" align="center" justify="flex-end">
            <Text fontWeight="bold">Total de horas:</Text>
            <Text>{totalHours}</Text>
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
          {cyclesByDate?.map((cycle) => (
            <Tr key={cycle?.id}>
              <Td>{cycle?.date}</Td>

              <Td>
                <VStack spacing="2" align="flex-start">
                  {cycle?.cycles?.map((interval) => (
                    <Text key={interval.id}>
                      {interval?.startDate} - {interval?.fineshedDate}
                    </Text>
                  ))}
                </VStack>
              </Td>

              <Td>
                <VStack spacing="2" align="flex-start">
                  {cycle?.cycles?.map((interval) => (
                    <Text key={interval.id}>{interval.totalCycle}</Text>
                  ))}
                </VStack>
              </Td>

              <Td>{cycle?.totalHoursByDate}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
