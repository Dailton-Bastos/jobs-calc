import React from 'react';
import { useParams } from 'react-router-dom';

import { Box } from '@chakra-ui/react';

import { Container } from '~/components/Container';
import { Head } from '~/components/Head';
import { useJobsContext } from '~/hooks/useJobsContext';

import { Form } from './Form';

export const EditJobPage = () => {
  const { id } = useParams();

  const { jobs } = useJobsContext();

  const data = React.useMemo(() => {
    return jobs?.find((job) => job?.id === id);
  }, [jobs, id]);

  const pageTitle = data?.title ?? 'Editar Job';

  return (
    <>
      <Head title={pageTitle} />

      <Container title="Editar Job" to="/jobs">
        <Box as="section">
          <Form job={data} />
        </Box>
      </Container>
    </>
  );
};
