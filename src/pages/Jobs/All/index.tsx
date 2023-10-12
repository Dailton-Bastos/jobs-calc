import React from 'react';
import { Link } from 'react-router-dom';

import {
  Box,
  Heading,
  Flex,
  Link as LinkChakra,
  Text,
  CircularProgress,
} from '@chakra-ui/react';

import { Head } from '~/components/Head';
import { Search } from '~/components/Job/Search';

const Jobs = React.lazy(() => import('./ListJobs'));

export const AllJobsPage = () => {
  const [value, setValue] = React.useState('');

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    },
    [],
  );

  const handleCleanInput = React.useCallback(() => {
    setValue('');
  }, []);

  return (
    <>
      <Head title="Meus Jobs" />

      <Box w="100%" my="10">
        <Heading size="md" textAlign="center">
          Meus Jobs
        </Heading>

        <Flex justify="space-between" align="center" mt="2" px="4">
          <Search
            value={value}
            handleChange={handleChange}
            cleanInput={handleCleanInput}
          />

          <LinkChakra
            as={Link}
            to="/jobs/new"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            borderWidth="1px"
            backgroundColor="orange.300"
            borderColor="orange.300"
            borderStyle="solid"
            borderRadius="md"
            color="white"
            p="3"
            h="40px"
            w="220px"
            _hover={{
              textDecoration: 'none',
              bg: 'orange.400',
              color: 'white',
            }}
          >
            <Text fontWeight="bold">Novo Job</Text>
          </LinkChakra>
        </Flex>

        <React.Suspense
          fallback={
            <CircularProgress value={30} color="orange.400" thickness="12px" />
          }
        >
          <Jobs />
        </React.Suspense>
      </Box>
    </>
  );
};
