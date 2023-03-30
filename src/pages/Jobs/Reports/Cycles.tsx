import React from 'react';
import { Link } from 'react-router-dom';

import {
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

import { FilteredCycles } from '~/@types/cycles';
import { Pagination } from '~/components/Pagination';
import { secondsToTime, truncateString } from '~/helpers/utils';

const PageSize = 8;

interface Props {
  cyclesData: FilteredCycles[];
}

export const Cycles = ({ cyclesData }: Props) => {
  const [cycles, setCycles] = React.useState<FilteredCycles[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);

  const totalHours = React.useMemo(() => {
    const total = cyclesData?.reduce(
      (totalInSeconds: number, cycle: FilteredCycles) => {
        totalInSeconds += cycle?.totalInSeconds;

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

  React.useEffect(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;

    const cyclesSlice = cyclesData?.slice(firstPageIndex, lastPageIndex);

    setCycles(cyclesSlice);
  }, [cyclesData, currentPage]);

  return (
    <>
      {!cyclesData.length ? (
        <Text textAlign="center" fontSize="large" mt="10">
          Nenhum resultado encontrado
        </Text>
      ) : (
        <TableContainer mt="5">
          <Table variant="simple">
            <TableCaption>
              <Flex gap="2" align="center" justify="flex-end">
                <Text fontWeight="bold">Total:</Text>
                <Text>{totalHours}</Text>
              </Flex>
            </TableCaption>

            <Thead>
              <Tr>
                <Th>Job</Th>
                <Th>Início</Th>
                <Th>Fim</Th>
                <Th>Horas</Th>
              </Tr>
            </Thead>
            <Tbody>
              {cycles?.map((cycle) => (
                <Tr key={cycle?.id}>
                  <Td>
                    <Tooltip label={cycle?.jobTitle} placement="top-start">
                      <LinkChakra as={Link} to={`/jobs/${cycle?.jobId}`}>
                        {truncateString(cycle?.jobTitle, 55)}
                      </LinkChakra>
                    </Tooltip>
                  </Td>

                  <Td>
                    <Tooltip
                      label={cycle?.startDate?.label}
                      placement="top-start"
                    >
                      <Text as="time" dateTime={cycle?.startDate?.dateTime}>
                        {cycle?.startDate?.title}
                      </Text>
                    </Tooltip>
                  </Td>

                  <Td>
                    {cycle?.endDate ? (
                      <Tooltip
                        label={cycle?.endDate?.label}
                        placement="top-start"
                      >
                        <Text as="time" dateTime={cycle?.endDate?.dateTime}>
                          {cycle?.endDate?.title}
                        </Text>
                      </Tooltip>
                    ) : (
                      'Em andamento'
                    )}
                  </Td>

                  <Td>{cycle?.hours}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}

      <Pagination
        currentPage={currentPage}
        totalCount={cyclesData?.length}
        pageSize={PageSize}
        siblingCount={1}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
};
