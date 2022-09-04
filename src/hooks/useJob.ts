import React from 'react';

import { ref, set, push } from 'firebase/database';

import { CreateJobFormData } from '~/@types/job';
import { db, serverTimestamp } from '~/config/firebase';

export const useJob = () => {
  const handleCreateJobData = React.useCallback(
    async (data: CreateJobFormData) => {
      const jobListRef = ref(db, 'jobs');
      const newJobRef = push(jobListRef);

      try {
        await set(newJobRef, {
          ...data,
          created_at: serverTimestamp(),
          updated_at: serverTimestamp(),
        });
      } catch (error) {
        throw new Error('Erro save job');
      }
    },
    [],
  );

  return { handleCreateJobData };
};
