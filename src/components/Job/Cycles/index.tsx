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

import { CycleByDate, GroupByDate } from '~/@types/cycles';
import { groupBy, secondsToTime } from '~/helpers/utils';
import { useCyclesContext } from '~/hooks/useCyclesContext';

export const Cycles = () => {
  const [cyclesByDate, setCyclesByDate] = React.useState<CycleByDate[]>([]);

  const { filteredCycles, formatCyclesByDate } = useCyclesContext();

  const totalCyclesHours = React.useMemo(() => {
    return cyclesByDate?.reduce((acc: number, cycle: CycleByDate) => {
      acc += cycle?.totalCycleInSeconds;

      return acc;
    }, 0);
  }, [cyclesByDate]);

  const { hours: totalHours, minutes: totalMinutes } =
    secondsToTime(totalCyclesHours);

  const TOTAL_HOURS = React.useMemo(() => {
    return `${totalHours}h:${totalMinutes}m`;
  }, [totalHours, totalMinutes]);

  React.useEffect(() => {
    const groupByDate: GroupByDate = groupBy(filteredCycles, 'date');

    const { cycles } = formatCyclesByDate(groupByDate);

    setCyclesByDate(cycles);
  }, [filteredCycles, formatCyclesByDate]);

  return (
    <TableContainer mt="10">
      <Table colorScheme="blackAlpha">
        <TableCaption>
          <Flex gap="2" align="center" justify="flex-end">
            <Text fontWeight="bold">Total de horas:</Text>
            <Text>{TOTAL_HOURS}</Text>
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
