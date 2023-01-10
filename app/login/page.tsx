"use client"
import Link from 'next/link'
import React, { useContext, useEffect } from 'react'
import Button from '../Components/Button'
import Input from '../Components/Input'
import PasswordInput from '../Components/PasswordInput'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginSchema } from '../../validation/auth.schema'
import Layout from '../../Components/Layout'
import { StoreContext } from '../context'
import { useRouter } from 'next/navigation'

interface Creds {
  phone: string,
  password: string,
}


function SIGNIN() {
  const router = useRouter()
  const { handleContext,token } = useContext(StoreContext)

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
    console.log("got here with ",data)
    localStorage.setItem('token','token')
    handleContext('token','token')
  })

  useEffect(()=>{
    console.log(token)
    if(token){
      router.replace('/dashboard')
    }
  },[token])

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

export default () => (
  <Layout>
    <SIGNIN/>
  </Layout>
)
