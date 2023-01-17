import * as yup from 'yup';

export const contactSchema = yup
  .object({
    name: yup
      .string()
      .required('Provide your name'),
    email: yup
      .string()
      .required('Provide your email'),
    message: yup
      .string()
      .required('Provide the message'),
    
  })
  .required();

