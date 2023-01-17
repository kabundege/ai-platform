import {Link, useNavigate} from 'react-router-dom'
import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginSchema } from '../../validation/auth.schema'
import { StoreContext } from '../../context';
import Input from '../../Components/Input';
import PasswordInput from '../../Components/PasswordInput';
import Button from '../../Components/Button';
import useFetch from '../../hooks/useFetch';
import { SigninApi } from '../../API/auth';
import Transitions from '../../Components/Transition';

interface Creds {
  phone: string,
  password: string,
}

function SIGNIN() {
  const navigate = useNavigate()
  const { handleContext,token } = useContext(StoreContext)
  const {isLoading,load} = useFetch()

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
    load(SigninApi(data))
    .then(res => {
      if(res.status === 200){
        handleContext('isAuth',true)
        localStorage.setItem('token',res.data.token)
        handleContext('user',res.data.user)
        handleContext('token',res.data.token)
      }
    })
  })

  useEffect(()=>{
    if(token){
      navigate('/dashboard')
    }
  },[token,navigate])

  return (
    <Transitions>
      <form className='mx-auto w-96 mt-20' onSubmit={submitHandler}>
          <h1 className='text-xl font-bold'>Sign In</h1>
          <div className='my-10' />
          <Input
            register={register('phone')} error={errors.phone?.message} type="tel" placeholder='Phone number'
            LeftIcon={<p className='text-bash tracking-wider text-sm'> (+250)</p>} />
          <div className='my-5' />
          <PasswordInput register={register('password')}  error={errors.password?.message} />
          <div className='my-5' />
          <Link to="/forgot">
              <p className='text-center w-96 text-bash hover:text-ashShade-1'>
                  Forgot Password ?
              </p>
          </Link>
          <div className='my-10' />
          <Button {...{isLoading}} text="Login" />
          <p className="flex items-center justify-center mt-5 text-bash text-sm">
            <span >Don't have an account yet ?</span>
            <Link to="/register" className='font-bold hover:text-gray-900 ml-1 text-black'>Register</Link>
          </p>
      </form>
    </Transitions>
  )
}

export default SIGNIN
