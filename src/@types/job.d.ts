export type JobStatus = 'opened' | 'developing' | 'done' | 'paused';

export type JobTypes = 'budget' | 'development' | 'other';

export type Job = {
  job_id: string;
  job_title: string;
  job_type: JobTypes;
  job_estimate_hour: number;
  job_estimate_minutes: number;
  job_briefing: string;
  user_id: string;
  status: JobStatus;
  created_at: number;
  updated_at: number;
};

export type CreateJobFormData = Job;

export interface JobDetail {
  id: string;
  title: string;
  type: string;
  estimate: string;
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
