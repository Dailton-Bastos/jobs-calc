export enum JobTypeEnum {
  budget = 'budget',
  development = 'development',
  other = 'other',
}

export type Job = {
  job_id: string;
  job_title: string;
  job_type: JobTypeEnum;
  job_estimate_hour: number;
  job_estimate_minutis: number;
  job_briefing: string;
};

export type CreateJobFormData = Job;
