import {Link} from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import { forgotSchema } from '../../validation/auth.schema'
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import Transitions from "../../Components/Transition";

interface Creds {
  phone: string,
}

function Forgot() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Creds>({
    reValidateMode: 'onChange',
    resolver: yupResolver(forgotSchema),
  });  

  const submitHandler = handleSubmit((data)=>{
    // code here
  })

  return (
    <Transitions>
      <form className='mx-auto w-96 mt-20' onSubmit={submitHandler}>
        <h1 className='text-xl font-bold'>Reset password</h1>
        <div className='my-10' />
        <Input
          register={register('phone')} error={errors.phone?.message} type="tel" placeholder='Phone number'
          LeftIcon={<p className='text-bash tracking-wider text-sm'> (+250)</p>} />
        <div className='my-10' />
        <Button text="Send" />
        <p className="flex items-center justify-center mt-5 text-bash text-sm">
          <span>Remembered something ?</span>
          <Link to="/login" className='font-bold hover:text-gray-900 ml-1 text-black'>Try again</Link>
        </p>
      </form>
    </Transitions>
  )
}

export default Forgot
