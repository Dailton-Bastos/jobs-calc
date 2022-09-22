import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  ref,
  push,
  get,
  child,
  orderByChild,
  equalTo,
  query,
  onValue,
} from 'firebase/database';

import {
  CreateJobFormData,
  Job,
  GetJobResponse,
  JobReport,
} from '~/@types/job';
import { db, serverTimestamp } from '~/config/firebase';
import {
  jobType,
  jobStatus,
  formatTime,
  formatDate,
  formatDateWithoutHour,
  formatHour,
  formatIntervalDuration,
} from '~/helpers/utils';

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
        estimateTotalSeconds: data.estimateTotalSeconds,
        briefing: data.job_briefing,
        status: jobStatus(data.status),
        user: data.user_id,
        createdAt: formatDate(data.created_at),
        updatedAt: formatDate(data.updated_at),
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

export const addJobReport = async (
  uid: string,
  hourStart: Date,
  hourEnd: Date,
) => {
  try {
    const data = {
      job_id: uid,
      date: formatDateWithoutHour(new Date()),

      report: {
        hourStart: formatHour(hourStart),
        hourEnd: formatHour(hourEnd),
        duration: formatIntervalDuration(hourStart, hourEnd),
      },
    };

    const minutes = data?.report?.duration?.minutes;
    const hour = data?.report?.duration?.hours;

    const isValid = hour || (!!minutes && minutes >= 1);

    if (!isValid) return;

    await push(ref(db, 'reports'), data);
  } catch (error) {
    throw new Error('Erro save job reports');
  }
};

export const useJobReports = (jobId: string) => {
  const [reportList, setReportList] = React.useState<JobReport[]>([]);

  React.useEffect(() => {
    const reportRef = query(
      ref(db, 'reports'),
      orderByChild('job_id'),
      equalTo(jobId),
    );

    onValue(reportRef, (snapshot) => {
      const existsData = snapshot.exists();

      if (existsData) {
        const reports = snapshot.val();

        const newReportList: JobReport[] = [];

        for (const id in reports) {
          newReportList.push({ id, ...reports[id] });
        }

        setReportList(newReportList);
      }
    });
  }, [jobId]);

  return { reportList };
};

export const useFormattedHour = (totalHourJob: number) => {
  const formattedHour = React.useMemo(() => {
    return formatTime(
      Math.floor(totalHourJob / 60 / 60),
      Math.floor((totalHourJob / 60) % 60),
    );
  }, [totalHourJob]);

  return { formattedHour };
};
