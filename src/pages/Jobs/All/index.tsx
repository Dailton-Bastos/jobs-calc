import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import { Box, Heading, Flex, CircularProgress, Button } from '@chakra-ui/react';

import { Head } from '~/components/Head';
import { useAuth } from '~/hooks/useAuth';
import { useCyclesContext } from '~/hooks/useCyclesContext';

const Jobs = React.lazy(() => import('./ListJobs'));

export const AllJobsPage = () => {
  const navite = useNavigate();

  const { activeCycle } = useCyclesContext();
  const { userEmailVerified } = useAuth();

  const disableNewJobButton = !!activeCycle || !userEmailVerified;

  return (
    <>
      <Head title="Meus Jobs" />

      <Box w="100%" py="8">
        <Flex justify="space-between" align="center">
          <Heading
            size="lg"
            textAlign="center"
            fontWeight="bold"
            variant="primary"
          >
            Meus Jobs
          </Heading>

          <Button
            variant="solid"
            bg="orange.400"
            color="white"
            fontSize="sm"
            fontWeight="bold"
            fontFamily="heading"
            position="relative"
            p="3"
            pl="8"
            minW="260px"
            h="12"
            disabled={disableNewJobButton}
            _hover={{
              bg: 'orange.300',
              color: 'white',
              boxShadow: 'md',
            }}
            onClick={() => navite('/jobs/new')}
          >
            <Flex
              align="center"
              justify="center"
              w="28px"
              height="28px"
              bg="whiteAlpha.300"
              borderRadius="5px"
              position="absolute"
              left="8px"
            >
              <FiPlus color="#fff" size={22} />
            </Flex>
            ADICIONAR NOVO JOB
          </Button>
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
