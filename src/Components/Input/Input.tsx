import React, { ReactNode } from 'react'

export type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    conatinerClassName?: string,
    LeftIcon?: ReactNode,
    RightIcon?: ReactNode,
    register?: any,
    error?: string
}

export default function Input({conatinerClassName,RightIcon,register,error,LeftIcon,...props}:InputProps) {
  return (
    <div className={'w-full '+conatinerClassName}>
      <div className={`border ${error?'border-red-300':""} w-full  px-4 flex justify-center items-center bg-gray-100`}>
        {LeftIcon ? (
          <>
            {LeftIcon}
            <div className='mx-1' />
          </>
          ) : null}
        <input {...register} {...props} className={`text-base outline-none py-3 flex-1 bg-transparent `+props.className} />
        {RightIcon ? (
          <>
            <div className='mx-1' />
            {RightIcon}
          </>
          ) : null}
      </div>
      <p className={`text-red-400 text-left w-full mt-1 ${!error?"hidden":""}`}>{error}</p>
    </div>
  )
}
