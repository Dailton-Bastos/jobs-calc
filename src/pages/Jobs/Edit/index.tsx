import React from 'react';
import { useParams } from 'react-router-dom';

import { Box } from '@chakra-ui/react';

import { Container } from '~/components/Container';
import { Head } from '~/components/Head';
import { useJobs } from '~/hooks/useJobs';

import { Form } from './Form';

export const EditJobPage = () => {
  const { id } = useParams();

  const { getJobById } = useJobs();

  const job = React.useMemo(() => getJobById(id), [getJobById, id]);

  const pageTitle = job?.title.fullTitle ?? 'Editar Job';

  return (
    <>
      <Head title={`Editar - ${pageTitle}`} />

      <Container title="Editar Job">
        <Box as="section">{job && <Form jobId={job.id} />}</Box>
      </Container>
    </>
  );
};
