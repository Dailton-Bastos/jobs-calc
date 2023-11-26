import React from 'react';
import { useParams } from 'react-router-dom';

import {
  Box,
  Text,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
import { format } from 'date-fns';

import { Pagination } from '~/components/Pagination';
import { formatHour, getTime } from '~/helpers/utils';
import { useCyclesContext } from '~/hooks/useCyclesContext';
import { userTitle } from '~/Layouts/Main/hooks/useTitle';

import { Actions } from './Actions';

const PAGE_SIZE = 8;

export const EditJobReports = () => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const { id } = useParams();
  const { cyclesData } = useCyclesContext();

  const cycles = cyclesData?.filter((cycle) => cycle?.jobId === id);

  const reports = React.useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PAGE_SIZE;
    const lastPageIndex = firstPageIndex + PAGE_SIZE;

    return cycles.slice(firstPageIndex, lastPageIndex);
  }, [cycles, currentPage]).map((cycle) => {
    const dateTitle = format(new Date(cycle.startDate), "dd'/'MM'/'yyyy");

    const { label, datetime } = getTime(cycle.startDate);

    const startAt = formatHour(cycle.startDate);
    const finishedAt = cycle.fineshedDate
      ? formatHour(cycle.fineshedDate)
      : '--:--';

    return {
      ...cycle,
      startAt,
      finishedAt,
      date: {
        title: dateTitle,
        label,
        datetime,
        timestamp: cycle.startDate,
      },
    };
  });

  const totalCount = React.useMemo(() => cycles?.length, [cycles]);

  const tableBg = useColorModeValue('secondary.light', 'whiteAlpha.400');
  const trBg = useColorModeValue('blackAlpha.900', 'secondary.dark');

  const setHeaderTitle = userTitle((state) => state.setHeaderTitle);

  React.useEffect(() => {
    setHeaderTitle('Apontamentos');
  }, [setHeaderTitle]);

  if (!reports.length) {
    return (
      <Text textAlign="center" fontSize="large" mt="10">
        Nenhum apontamento encontrado
      </Text>
    );
  }

  return (
    <Box w="100%">
      <TableContainer mt="6">
        <Table
          colorScheme="blackAlpha"
          bg={tableBg}
          borderRadius="lg"
          overflow="hidden"
        >
          <Thead>
            <Tr bg={trBg}>
              <Th textTransform="capitalize" fontSize="md" color="white">
                Data
              </Th>
              <Th textTransform="capitalize" fontSize="md" color="white">
                Início
              </Th>
              <Th textTransform="capitalize" fontSize="md" color="white">
                Fim
              </Th>
              <Th textTransform="capitalize" fontSize="md" color="white">
                Ações
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {reports?.map((cycle) => (
              <Tr key={cycle.id}>
                <Td fontWeight="bold" pt="2" pb="2" color="variant">
                  <Tooltip label={cycle.date.label}>{cycle.date.title}</Tooltip>
                </Td>

                <Td pt="2" pb="2" color="variant">
                  {cycle.startAt}
                </Td>

                <Td pt="2" pb="2" color="variant">
                  <Text>{cycle.finishedAt}</Text>
                </Td>

                <Td pt="2" pb="2" color="variant">
                  <Actions cycle={cycle} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Box pt="6">
        <Pagination
          currentPage={currentPage}
          totalCount={totalCount}
          pageSize={PAGE_SIZE}
          siblingCount={1}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </Box>
    </Box>
  );
};
