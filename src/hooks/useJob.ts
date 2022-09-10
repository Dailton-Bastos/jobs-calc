import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ref, push, get, child } from 'firebase/database';

import { CreateJobFormData, Job, GetJobResponse } from '~/@types/job';
import { db, serverTimestamp } from '~/config/firebase';
import { jobType, jobStatus, formatTime } from '~/helpers/utils';

export const getJob = async (id: string): Promise<GetJobResponse> => {
  try {
    let job = null;

    const snapshot = await get(child(ref(db), `jobs/${id}`));

    if (snapshot && snapshot.exists()) {
      const data: Job = snapshot.val();

      job = {
        id: data.job_id,
        title: data.job_title,
        type: jobType(data.job_type),
        estimate: formatTime(data.job_estimate_hour, data.job_estimate_minutes),
        briefing: null,
        status: jobStatus(data.status),
        user: 'LvXwBaO8O8VvlZ9YScOvuwiXHwf1',
        createdAt: '10/09/2022',
        updatedAt: '10/09/2022',
      };
    }
    return { job };
  } catch (error) {
    throw new Error('Error fetch job');
  }
};

export const useJob = () => {
  const navigate = useNavigate();

  const handleCreateJobData = React.useCallback(
    async (data: CreateJobFormData) => {
      if (!data) return;

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
