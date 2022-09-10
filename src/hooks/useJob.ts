import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ref, push } from 'firebase/database';

import { CreateJobFormData } from '~/@types/job';
import { db, serverTimestamp } from '~/config/firebase';

export const useJob = () => {
  const navigate = useNavigate();

  const handleCreateJobData = React.useCallback(
    async (data: CreateJobFormData) => {
      try {
        const job = await push(ref(db, 'jobs'), {
          ...data,
          created_at: serverTimestamp(),
          updated_at: serverTimestamp(),
        });

        if (job) {
          return navigate(`/jobs/${job?.key}`);
        }
      } catch (error) {
        throw new Error('Erro save job');
      }
    },
    [navigate],
  );

  return { handleCreateJobData };
};
