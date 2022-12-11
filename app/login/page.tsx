"use client"
import Link from 'next/link'
import React from 'react'
import Button from '../Components/Button'
import Input from '../Components/Input'
import PasswordInput from '../Components/PasswordInput'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginSchema } from '../../validation/auth.schema'

interface Creds {
  phone: string,
  password: string,
}


export default function Login() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Creds>({
    reValidateMode: 'onChange',
    resolver: yupResolver(LoginSchema),
  });  

  const submitHandler = handleSubmit((data)=>{
    // code here
  })

  return (
    <form className='mx-auto w-96 mt-20' onSubmit={submitHandler}>
        <h1 className='text-xl font-bold'>Sign In</h1>
        <div className='my-10' />
        <Input 
          register={register('phone')} error={errors.phone?.message} type="tel" placeholder='Phone number'
          LeftIcon={<p className='text-bash tracking-wider text-sm'> (+250)</p>} />
        <div className='my-5' />
        <PasswordInput register={register('password')}  error={errors.password?.message} />
        <div className='my-5' />
        <Link href="/forgot">
            <p className='text-center w-96 text-bash hover:text-ashShade-1'>
                Forgot Password ?
            </p>
        </Link>
        <div className='my-10' />
        <Button text="Login" />
        <p className="flex items-center justify-center mt-5 text-bash text-sm">
          <span >Don't have an account yet ?</span>
          <Link href="/register" className='font-bold hover:text-gray-900 ml-1 text-black'>Register</Link>
        </p>
    </form>
  )
}
