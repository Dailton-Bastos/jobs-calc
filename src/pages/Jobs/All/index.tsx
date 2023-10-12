import { Head } from '~/components/Head';

import { ListJobs } from './ListJobs';

export const AllJobsPage = () => {
  return (
    <>
      <Head title="Meus Jobs" />

      <ListJobs />
    </>
  );
};
