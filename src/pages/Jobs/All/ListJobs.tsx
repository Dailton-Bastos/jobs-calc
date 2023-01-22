import React from 'react';
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

import { JobDetail } from '~/@types/job';
import { useAuth } from '~/hooks/useAuth';
import { handleGetJobs } from '~/hooks/useJob';

export const ListJobs = () => {
  const [jobs, setJobs] = React.useState<JobDetail[]>([]);

  const { user } = useAuth();

  const uid = user?.uid as string;

  const handleRecentsJobs = React.useCallback(async () => {
    const { allJobs } = await handleGetJobs(uid);

    setJobs(allJobs?.reverse());
  }, [uid]);

  React.useEffect(() => {
    handleRecentsJobs();
  }, [handleRecentsJobs]);

  return (
    <Box w="100%" my="10">
      <Flex justify="space-between" align="center">
        <Heading size="md">My Jobs</Heading>

        <LinkChakra
          as={Link}
          to="/jobs/new"
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="relative"
          bg="orange.300"
          borderRadius="md"
          p="3"
          h="56px"
          w="260px"
          _hover={{
            textDecoration: 'none',
          }}
        >
          <Text color="white" fontWeight="bold">
            Add new Job
          </Text>
        </LinkChakra>
      </Flex>

      <TableContainer mt="10">
        <Table variant="simple">
          <TableCaption>
            <Flex gap="2" align="center" justify="flex-end">
              <Text fontWeight="bold">Total de jobs:</Text>
              <Text>{jobs?.length}</Text>
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
            {jobs &&
              jobs.map((job) => (
                <Tr key={job.id}>
                  <Td>{job.title}</Td>

                  <Td>{job.type}</Td>

                  <Td>
                    <Text>{job.estimate}</Text>
                  </Td>

                  <Td>
                    <Text color={job.status.color}>{job.status.title}</Text>
                  </Td>

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
