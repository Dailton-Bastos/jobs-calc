import { JobFormatted } from '~/@types/job';

export const searchJobByQuery = async (query: string, data: JobFormatted[]) => {
  const results = await new Promise<JobFormatted[]>((resolve) => {
    setTimeout(() => {
      const jobs = data?.filter((job) => {
        return job?.title?.fullTitle
          .toLowerCase()
          .includes(query.toLowerCase());
      });
      resolve(jobs);
    }, 1000);
  });

  return results;
};
