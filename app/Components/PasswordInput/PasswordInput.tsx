"use client"
import React, {useState} from 'react'
import Input from '../Input'
import { RxEyeClosed,RxEyeOpen } from 'react-icons/rx'
import { InputProps } from '../Input/Input'

interface Props extends InputProps {}

export default function (props:Props) {

  const [showPassword, setShowPassword] = useState(false)

  const togglePassword = () => {
    setShowPassword(prev => !prev)
  }

  return (
    <Input 
        placeholder='Password'
        {...props} 
        type={showPassword?"text":"password"} 
        RightIcon={
            showPassword ? 
                <RxEyeOpen className='cursor-pointer hover:opacity-90' onClick={togglePassword} /> : 
                <RxEyeClosed className='cursor-pointer hover:opacity-90' onClick={togglePassword} />
        } 
    />
  )
}
