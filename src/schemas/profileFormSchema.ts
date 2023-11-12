import * as yup from 'yup';

export const profileFormSchema = yup
  .object({
    displayName: yup.string().trim().min(3, 'Mínimo de 3 caracteres'),
    photoURL: yup.string().url('Link inválido').notRequired(),
    updatePassword: yup.boolean(),
    password: yup.string().when('updatePassword', {
      is: true,
      then: yup.string().min(6, 'Mínimo de 6 caracteres').required(),
      otherwise: yup.string().notRequired(),
    }),
    passwordConfirmation: yup.string().when('updatePassword', {
      is: true,
      then: yup
        .string()
        .required('Confirmação de senha')
        .oneOf([yup.ref('password'), null], 'As senhas não conferem'),
      otherwise: yup.string().notRequired(),
    }),
  })
  .required();
