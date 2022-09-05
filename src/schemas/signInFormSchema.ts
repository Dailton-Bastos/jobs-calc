import * as yup from 'yup';

export const signInFormSchema = yup
  .object({
    email: yup
      .string()
      .required('Campo obrigatório*')
      .email('Digite um e-mail válido*'),
    password: yup.string().required('Campo obrigatório*'),
  })
  .required();
