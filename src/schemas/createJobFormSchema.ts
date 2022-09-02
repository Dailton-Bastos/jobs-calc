import * as yup from 'yup';

export const createJobFormSchema = yup
  .object({
    job_id: yup.string().when('job_type', {
      is: (type: string) => type !== 'other',
      then: yup.string().required('Campo obrigatório*').trim(),
    }),
    job_title: yup.string().required('Campo obrigatório*').trim(),
    job_type: yup.string().required('Campo obrigatório*'),
    job_estimate_hour: yup.number().integer().required('Campo obrigatório*'),
    job_estimate_minutis: yup.number().when('job_estimate_hour', {
      is: (value: number) => value === 0,
      then: yup.number().min(1, 'O valor não pode ser 0').required(),
    }),
  })
  .required();
