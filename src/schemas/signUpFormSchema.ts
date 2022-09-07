import * as yup from 'yup';

export const signUpFormSchema = yup
  .object({
    email: yup
      .string()
      .required('É obrigatório informar um e-mail')
      .email('É obrigatório informar um e-mail válido'),
    displayName: yup
      .string()
      .required('É obrigatório informar um nome')
      .min(3, 'O nome deve ter pelo menos 3 caracteres'),
    password: yup
      .string()
      .required('É obrigatório informar uma senha')
      .min(6, 'A senha deve ter pelo menos 6 caracteres'),
    passwordConfirmation: yup
      .string()
      .required('É obrigatório confirmar a senha')
      .oneOf([yup.ref('password'), null], 'As senhas não conferem'),
  })
  .required();
