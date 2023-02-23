import * as yup from 'yup';

export const newJobFormValidationSchema = yup
  .object({
    // jobberId: yup.string().when('job_type', {
    //   is: (type: string) => type !== 'other',
    //   then: yup.string().required('Campo obrigatório*').trim(),
    // }),
    title: yup.string().required('Campo obrigatório*').trim(),
    type: yup.string().required('Campo obrigatório*'),
    hourEstimate: yup.number().integer().required('Campo obrigatório*'),
    minutesEstimate: yup.number().when('hourEstimate', {
      is: (value: number) => value === 0,
      then: yup.number().min(5, 'O valor não pode ser 0').required(),
    }),
    description: yup.string(),
  })
  .required();
