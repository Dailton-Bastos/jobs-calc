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

import { JobReport } from '~/@types/job';

interface Props {
  reports: JobReport[];
}

export const JobReports = ({ reports = [] }: Props) => {
  const [jobReports, setJobReports] = React.useState<JobReport[]>([]);

  React.useEffect(() => {
    const data = reports.map((report) => {
      return {
        ...report,
        reports: report.reports.map((item) => {
          return {
            ...item,
            duration: {
              ...item.duration,
              hours: item.duration.hours.toString().padStart(2, '0'),
              minutes: item.duration.minutes.toString().padStart(2, '0'),
            },
          };
        }),
      };
    });

    setJobReports(data);
  }, [reports]);

  return (
    <TableContainer mt="10">
      <Table colorScheme="blackAlpha">
        <TableCaption>
          <Flex gap="2" align="center" justify="flex-end">
            <Text fontWeight="bold">Total de horas:</Text>
            <Text>07h:30m</Text>
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
          {jobReports.map((report) => (
            <Tr key={report.date}>
              <Td>{report.date}</Td>

              <Td>
                <VStack spacing="2" align="flex-start">
                  {report?.reports?.map((re, index) => (
                    <Text key={index}>{`${re.hourStart} - ${re.hourEnd}`}</Text>
                  ))}
                </VStack>
              </Td>

              <Td>
                <VStack spacing="2" align="flex-start">
                  {report?.reports?.map((re, index) => (
                    <Text
                      key={index}
                    >{`${re.duration?.hours}h:${re.duration?.minutes}m`}</Text>
                  ))}
                </VStack>
              </Td>

              <Td>5h:15m</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
