import * as yup from 'yup';

export const profileFormSchema = yup
  .object({
    displayName: yup
      .string()
      .trim()
      .min(3, 'Mínimo de 3 caracteres')
      .notRequired(),
    photoUrl: yup.string().url('Link inválido').notRequired(),
    password: yup.string().min(6, 'Mínimo 6 caracteres').notRequired(),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], 'As senhas não conferem'),
  })
  .required();
