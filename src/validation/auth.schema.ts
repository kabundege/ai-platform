import * as yup from 'yup';

export const forgotSchema = yup
  .object({
    phone: yup
      .string()
      .required('Provide your phone')
      .matches(
        /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
        "Phone number is not valid"
      )
  })
  .required();

export const farmSchema = yup
  .object({
    name: yup
      .string()
      .required('Provide your name')
  })
  .required();

export const LoginSchema = yup
  .object({
    phone: yup
      .string()
      .required('Provide your phone')
      .matches(
        /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
        "Phone number is not valid"
      ),
    password: yup
      .string()
      .required('Provide your password'),
  })
  .required();

export const RegisterSchema = yup
  .object({
    province: yup
      .string()
      .required('Provide your province'),
    lastName: yup
      .string()
      .required('Provide your district'),
    firstName: yup
      .string()
      .required('Provide your sector'),
    phone: yup
      .string()
      .required('Provide your phone')
      .matches(
        /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
        "Phone number is not valid"
      ),
    password: yup
      .string()
      .required('Provide your password'),
    confirm: yup
      .string()
      .required('Confirm your password'),
  })
  .required();
