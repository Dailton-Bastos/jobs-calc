import * as yup from 'yup';

export const jobFormValidationSchema = yup
  .object({
    jobberId: yup.string().when('type', {
      is: (type: string) => type !== 'other',
      then: yup
        .string()
        .required('Campo obrigatório')
        .matches(/^[0-9]+$/, 'ID inválido')
        .trim(),
    }),
    title: yup.string().required('Campo obrigatório').trim(),
    type: yup.string().required('Campo obrigatório'),
    hourEstimate: yup
      .number()
      .typeError('Você precisa especificar um número')
      .min(0, 'Valor mínimo 0')
      .max(150, 'Valor máximo 150')
      .integer('Digite apenas número'),
    minutesEstimate: yup
      .number()
      .when('hourEstimate', {
        is: (value: number) => value === 0,
        then: yup
          .number()
          .typeError('Você precisa especificar um número')
          .min(5, 'O valor mínimo 5')
          .max(59, 'Valor máximo 59')
          .integer('Digite apenas número'),
      })
      .typeError('Você precisa especificar um número')
      .min(0, 'Valor mínimo 0')
      .max(59, 'Valor máximo 59')
      .integer('Digite apenas número'),
    description: yup.string(),
    status: yup.string().required('Campo obrigatório'),
    isHighlight: yup.boolean().required(),
  })
  .required();
