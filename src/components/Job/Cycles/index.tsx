import {
  Flex,
  // VStack,
  Text,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tbody,
  Tr,
  Th,
  // Td,
} from '@chakra-ui/react';

// import { useCyclesContext } from '~/hooks/useCyclesContext';

// import { JobTime } from '../Time';

export const Cycles = () => {
  // const { jobInfo } = useCyclesContext();

  return (
    <TableContainer mt="10">
      <Table colorScheme="blackAlpha">
        <TableCaption>
          <Flex gap="2" align="center" justify="flex-end">
            <Text fontWeight="bold">Total de horas:</Text>
            {/* <Text>{jobInfo?.usedTime.time}</Text> */}
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
          {/* {jobInfo?.cyclesByDate?.map((cycleByDate) => (
            <Tr key={cycleByDate?.id}>
              <Td>
                <JobTime
                  label={cycleByDate?.time.label}
                  dateTime={cycleByDate?.time.datetime}
                >
                  {cycleByDate?.time.title}
                </JobTime>
              </Td>

              <Td>
                <VStack spacing="2" align="flex-start">
                  {cycleByDate?.cycles?.map((cycle) => (
                    <Text key={cycle.id}>
                      <Text as="time">{cycle.startHour}</Text> -{' '}
                      <Text as="time">{cycle.fineshedHour}</Text>
                    </Text>
                  ))}
                </VStack>
              </Td>

              <Td>
                <VStack spacing="2" align="flex-start">
                  {cycleByDate?.cycles?.map((cycle) => (
                    <Text key={cycle.id}>{cycle.total}</Text>
                  ))}
                </VStack>
              </Td>

              <Td>{cycleByDate.cycleTotalTime}</Td>
            </Tr>
          ))} */}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
