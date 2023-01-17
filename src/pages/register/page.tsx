"use client"
import {Link, useNavigate} from 'react-router-dom';
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterSchema } from "../../validation/auth.schema";
import SelectField from '../../Components/SelectField';
import Input from '../../Components/Input';
import PasswordInput from '../../Components/PasswordInput';
import Button from '../../Components/Button';
import { Provinces } from '../../constants';
import useFetch from '../../hooks/useFetch';
import { SignupApi } from '../../API/auth';
import { toast } from 'react-toastify';
import Transitions from '../../Components/Transition';

interface Creds {
  province: string;
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
  confirm: string;
}

function Register() {
  const navigate = useNavigate()
  const {isLoading,load} = useFetch()

  const {
    register,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Creds>({
    reValidateMode: "onChange",
    defaultValues: {},
    resolver: yupResolver(RegisterSchema),
  });

  const submitHandler = handleSubmit(({ confirm,password,phone,lastName,firstName }) => {
    // 1 . check if teh passwords  match
    if(password !== confirm){
      setError('password',{message:'Should match th econfirmation'})
      return setError('confirm',{message:'Should match the password'})
    }
    // code here
    const payload = {phone,password,lastName,firstName}
    load(SignupApi(payload))
    .then(res => {
      if(res.status === 201){
        navigate('/login')
        toast.success(res.message)
      }
    })
  });

  return (
    <Transitions>
      <form className="mx-auto w-96 mt-20" onSubmit={submitHandler}>
        <h1 className="text-xl font-bold">Sign Up</h1>
        <div className="my-10" />
        <SelectField
          error={errors.province?.message}
          onChange={(ev) => setValue("province", ev)}
          placeholder="Province"
          data={Provinces}
        />
        <div className="my-5" />
        <div className="flex items-center justify-center">
          <Input
            register={register("firstName")}
            error={errors.lastName?.message}
            placeholder="Firstname"
            className="w-full"
          />
          <div className="mx-1" />
          <Input
            register={register("lastName")}
            error={errors.lastName?.message}
            placeholder="Lastname"
            className="w-full"
          />
        </div>
        <div className="my-5" />
        <Input
          register={register("phone")}
          error={errors.phone?.message}
          LeftIcon={<p className="text-bash tracking-wider text-sm">(+250)</p>}
          placeholder="Phone number"
        />
        <div className="my-5" />
        <PasswordInput
          register={register("password")}
          error={errors.password?.message}
        />
        <div className="my-5" />
        <PasswordInput
          placeholder="Confirm password"
          register={register("confirm")}
          error={errors.confirm?.message}
        />
        <div className="my-10" />
        <Button text="Register" {...{isLoading}} />
        <p className="flex items-center justify-center mt-5 text-bash text-sm">
          <span>Already have an account ?</span>
          <Link
            to="/login"
            className="font-bold hover:text-gray-900 ml-1 text-black"
          >
            Login
          </Link>
        </p>
      </form>
    </Transitions>
  );
}

export default Register
