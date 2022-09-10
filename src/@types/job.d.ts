type JobStatus = 'opened' | 'developing' | 'done' | 'paused';

export type Job = {
  job_id: string;
  job_title: string;
  job_type: 'budget' | 'development' | 'other';
  job_estimate_hour: number;
  job_estimate_minutis: number;
  job_briefing: string;
  user_id: string;
  status: JobStatus;
};

export type CreateJobFormData = Job;
