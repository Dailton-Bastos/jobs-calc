import React from 'react';

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

import { Job, GetJobResponse, JobReport } from '~/@types/job';
import { db } from '~/config/firebase';
import {
  jobStatus,
  formatTime,
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
        id: data.id,
        title: data.title,
        type: data.type,
        estimate: '',
        estimateTotalSeconds: 0,
        briefing: '',
        status: {
          title: '',
          color: '',
        },
        user: '',
        createdAt: '',
        updatedAt: '',
      };
    }
    return { job };
  } catch (error) {
    throw new Error('Error fetch job');
  }
};

export const addJobReport = async (
  uid: string,
  hourStart: Date,
  hourEnd: Date,
) => {
  try {
    const data = {
      id: uid,
      date: formatDateWithoutHour(new Date()),

      report: {
        hourStart: formatHour(hourStart),
        hourEnd: formatHour(hourEnd),
        duration: formatIntervalDuration(hourStart, hourEnd),
      },
    };

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

export const handleGetJobs = async (uid: string) => {
  try {
    const snapshot = await get(
      query(child(ref(db), 'jobs'), orderByChild('user_id'), equalTo(uid)),
    );

    const jobsList: Job[] = [];

    if (snapshot && snapshot.exists()) {
      const data = snapshot.val();

      for (const id in data) {
        jobsList.push({ id, ...data[id] });
      }
    }

    const allJobs = jobsList?.map((job: Job) => {
      return {
        ...job,
        estimate: formatTime(job.hourEstimate, job.minutesEstimate),

        status: jobStatus(job.status),
      };
    });

    return { allJobs };
  } catch (error) {
    throw new Error('Error fetch jobs list');
  }
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
