import type { FuseResult } from 'fuse.js';

import type { JobFormatted } from '~/@types/job';

export const searchJobByQuery = async (data: FuseResult<JobFormatted>[]) => {
  const results = await new Promise<JobFormatted[]>((resolve) => {
    setTimeout(() => {
      const searchResults = data.map((fuseResult) => fuseResult.item);

      resolve(searchResults);
    }, 1000);
  });

  return results;
};
