export type JobStatus = 'opened' | 'developing' | 'done' | 'paused';

export type JobTypes = 'budget' | 'development' | 'other';

export type Job = {
  id?: string;
  jobberId?: string;
  title: string;
  type: JobTypes;
  estimateHour: number;
  estimateHinutes: number;
  // estimateTotalSeconds: number;
  briefing?: string;
  // user_id: string;
  status: JobStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateJobFormData = Job;

export interface JobDetail {
  id?: string;
  title: string;
  type: string;
  estimate: string;
  estimateTotalSeconds: number;
  briefing: string | null;
  status: {
    title: string;
    color: string;
  };
  user: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetJobResponse {
  job: JobDetail | null;
}

export interface FormattedJobType {
  id: string;
  date: string;
  job_id: string;
  reports: Array<{
    duration: {
      hours: string;
      minutes: string;
    };
    hourEnd: string;
    hourStart: string;
  }>;
  totalHours: number;
  formattedTimer: string;
}

interface Duration {
  duration: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  hourEnd: string;
  hourStart: string;
}

export interface JobReports {
  id: string;
  date: string;
  job_id: string;
  reports: Duration[];
  totalHours: number;
}

export interface JobReport {
  date: string;
  job_id: string;
  report: Duration;
}

export interface GetJobReports {
  reports: JobReport[];
}

export interface JobProgressProps {
  estimateTotalSeconds: number;
  uid: string;
  totalHourJobUsed: number;
}
