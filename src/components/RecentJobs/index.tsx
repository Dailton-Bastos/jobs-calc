import { RiEyeLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import {
  Box,
  Heading,
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
} from '@chakra-ui/react';

import { truncateString } from '~/helpers/utils';
import { useJobsContext } from '~/hooks/useJobsContext';

export const RecentJobs = () => {
  const { jobs } = useJobsContext();

  return (
    <Box w="100%" my="10">
      <Flex justify="space-between" align="center">
        <Heading size="md">Recent Jobs</Heading>

        <LinkChakra
          as={Link}
          to="/jobs"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="gray.500"
          p="2"
          textDecoration="underline"
          fontWeight="bold"
        >
          View All
        </LinkChakra>
      </Flex>

      <TableContainer mt="10">
        <Table variant="simple">
          <TableCaption>
            <Flex gap="2" align="center" justify="flex-end">
              <Text fontWeight="bold">Total de jobs:</Text>
              <Text>10</Text>
            </Flex>
          </TableCaption>
          <Thead>
            <Tr>
              <Th>Título</Th>
              <Th>Tipo</Th>
              <Th>Tempo Estimado</Th>
              <Th>Status</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {jobs?.map((job) => (
              <Tr key={job.id}>
                <Td>
                  <Text>{truncateString(job.title, 50)}</Text>
                </Td>

                <Td>{job.type}</Td>

                <Td>
                  <Text>{job.hourEstimate}</Text>
                </Td>

                <Td>{job.status}</Td>

                <Td>
                  <LinkChakra
                    as={Link}
                    to={`/jobs/${job.id}`}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    p="2"
                  >
                    <RiEyeLine size={22} />
                  </LinkChakra>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};
