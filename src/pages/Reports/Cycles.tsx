import React from 'react';

import {
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
  useColorModeValue,
} from '@chakra-ui/react';
import { differenceInSeconds } from 'date-fns';

import { CycleApiData } from '~/@types/cycles';
import { Pagination } from '~/components/Pagination';
import {
  formatDateWithoutHours,
  formatHour,
  getTime,
  secondsToTime,
} from '~/helpers/utils';
import { useCyclesContext } from '~/hooks/useCyclesContext';

import { Description } from './Description';

const PageSize = 8;

interface Props {
  cyclesData: CycleApiData[];
}

export const Cycles = ({ cyclesData }: Props) => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const { jobs } = useCyclesContext();

  const tableBg = useColorModeValue('secondary.light', 'whiteAlpha.400');
  const trBg = useColorModeValue('blackAlpha.900', 'secondary.dark');

  const firstPageIndex = (currentPage - 1) * PageSize;
  const lastPageIndex = firstPageIndex + PageSize;

  const cycles = cyclesData
    ?.map((cycle) => {
      const job = jobs?.find((item) => item.id === cycle.jobId);

      const fineshedDate = cycle?.fineshedDate
        ? formatHour(cycle.fineshedDate)
        : '';

      const startDate = formatHour(cycle?.startDate);

      const totalCycleInSeconds = cycle?.fineshedDate
        ? differenceInSeconds(
            new Date(cycle.fineshedDate),
            new Date(cycle.startDate),
          )
        : 0;

      const { hours, minutes, seconds } = secondsToTime(totalCycleInSeconds);

      const { time: date } = getTime(cycle.startDate);
      const createdAt = formatDateWithoutHours(cycle.startDate);

      const total = `${hours}h:${minutes}m:${seconds}s`;

      return {
        id: cycle?.id,
        job,
        date: {
          ...date,
          title: createdAt,
        },
        interval: `${startDate} - ${fineshedDate}`,
        total,
        description: cycle?.description,
      };
    })
    .slice(firstPageIndex, lastPageIndex);

  const totalCount = cyclesData?.length;

  const totalHours = React.useMemo(() => {
    const total = cyclesData?.reduce(
      (totalInSeconds: number, cycle: CycleApiData) => {
        totalInSeconds += cycle?.fineshedDate
          ? differenceInSeconds(
              new Date(cycle.fineshedDate),
              new Date(cycle.startDate),
            )
          : 0;

        return totalInSeconds;
      },
      0,
    );

    const { hours, minutes } = secondsToTime(total);

    return `${hours}h:${minutes}m`;
  }, [cyclesData]);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [cyclesData]);

  return (
    <>
      {!cyclesData.length ? (
        <Text textAlign="center" fontSize="large" mt="10" color="variant">
          Nenhum resultado encontrado
        </Text>
      ) : (
        <TableContainer mt="5">
          <Table
            colorScheme="blackAlpha"
            bg={tableBg}
            borderRadius="lg"
            overflow="hidden"
            boxShadow="base"
          >
            <TableCaption>
              <Flex gap="2" align="center" justify="flex-end">
                <Text fontWeight="bold" color="variant">
                  Total:
                </Text>
                <Text>{totalHours}</Text>
              </Flex>
            </TableCaption>

            <Thead>
              <Tr bg={trBg}>
                <Th textTransform="capitalize" fontSize="md" color="white">
                  Job
                </Th>
                <Th textTransform="capitalize" fontSize="md" color="white">
                  Data
                </Th>
                <Th textTransform="capitalize" fontSize="md" color="white">
                  Intervalo
                </Th>
                <Th textTransform="capitalize" fontSize="md" color="white">
                  Total
                </Th>
                <Th textTransform="capitalize" fontSize="md" color="white">
                  Obs
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {cycles?.map((cycle) => (
                <Tr key={cycle?.id}>
                  <Td fontWeight="bold" color="variant">
                    <Tooltip
                      label={cycle?.job?.title?.fullTitle}
                      placement="top-start"
                    >
                      <a
                        href={`/jobs/${cycle?.job?.id}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {cycle?.job?.title?.shortTitle}
                      </a>
                    </Tooltip>
                  </Td>

                  <Td color="variant">
                    <Tooltip label={cycle?.date?.label} placement="top-start">
                      <Text as="time" dateTime={cycle?.date?.datetime}>
                        {cycle?.date?.title}
                      </Text>
                    </Tooltip>
                  </Td>

                  <Td color="variant">{cycle?.interval}</Td>

                  <Td color="variant">{cycle?.total}</Td>

                  <Td color="variant">
                    {cycle?.description && (
                      <Description description={cycle?.description} />
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}

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
