"use client"
import Link from "next/link";
import React from "react";
import { Provinces } from "../../constants";
import Button from "../Components/Button";
import Input from "../Components/Input";
import PasswordInput from "../Components/PasswordInput";
import SelectField from "../Components/SelectField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterSchema } from "../../validation/auth.schema";
import Layout from "../../Components/Layout";

interface Creds {
  province: string;
  district: string;
  sector: string;
  phone: string;
  password: string;
  confirm: string;
}

function Register() {

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

  const submitHandler = handleSubmit((data) => {
    // 1 . check if teh passwords  match
    if(data.password !== data.confirm)
    setError('password',{message:'Should match th econfirmation'})
    return setError('confirm',{message:'Should match the password'})
    // code here
  });

  return (
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
          register={register("district")}
          error={errors.sector?.message}
          placeholder="District"
          className="w-full"
        />
        <div className="mx-1" />
        <Input
          register={register("sector")}
          error={errors.sector?.message}
          placeholder="Sector"
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
      <Button text="Register" />
      <p className="flex items-center justify-center mt-5 text-bash text-sm">
        <span>Already have an account ?</span>
        <Link
          href="/login"
          className="font-bold hover:text-gray-900 ml-1 text-black"
        >
          Login
        </Link>
      </p>
    </form>
  );
}

export default () => (
  <Layout>
    <Register/>
  </Layout>
)
