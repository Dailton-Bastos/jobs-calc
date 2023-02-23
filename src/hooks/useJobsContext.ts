import React from 'react';

import { JobsContext } from '~/contexts/Jobs/JobsContext';

export const useJobsContext = () => React.useContext(JobsContext);
