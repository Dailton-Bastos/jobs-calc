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

import { FormattedJobType, JobReports as JobReportsType } from '~/@types/job';
import { formatTime } from '~/helpers/utils';
import { useFormattedHour } from '~/hooks/useJob';

interface Props {
  reports: JobReportsType[];
  totalHourJob: number;
}

export const JobReports = ({ reports = [], totalHourJob }: Props) => {
  const [jobReports, setJobReports] = React.useState<FormattedJobType[]>([]);

  const { formattedHour } = useFormattedHour(totalHourJob);

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
        formattedTimer: formatTime(
          Math.floor(report.totalHours / 60 / 60),
          Math.floor((report.totalHours / 60) % 60),
        ),
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
            <Text>{formattedHour}</Text>
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
            <Tr key={report.id}>
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

              <Td>{report.formattedTimer}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
