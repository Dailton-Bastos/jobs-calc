import * as yup from 'yup';

export const forgotFormSchema = yup
  .object({
    email: yup
      .string()
      .required('Campo obrigatório')
      .email('É obrigatório informar um e-mail válido'),
  })
  .required();
