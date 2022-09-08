export enum JobTypeEnum {
  budget = 'budget',
  development = 'development',
  other = 'other',
}

type JobStatus = 'opened' | 'developing' | 'done' | 'paused';

export type Job = {
  job_id: string;
  job_title: string;
  job_type: JobTypeEnum;
  job_estimate_hour: number;
  job_estimate_minutis: number;
  job_briefing: string;
  user_id: string;
  status: JobStatus;
};

export type CreateJobFormData = Job;
