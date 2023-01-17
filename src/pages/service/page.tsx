'use client'
import React, { useState } from 'react'
import Button from '../../Components/Button'
import UploadField from '../../Components/UploadField'

export default function Services() {
  const [file,setFile] = useState()

  const handleChange = (val:any) => {
    setFile(val)
  }
  
  return (
    <div className="h-full w-full">
      <h1 className='text-center text-5xl text-gray-700 mt-32 font-black'>Welcome Back</h1>
      <h2 className='text-center text-2xl w-4/12 mx-auto my-5 text-gray-400 font-medium'>
        Provide a video or an image your took of
        you chicken, and witness the magic of AI
      </h2>
      <div className='flex flex-col items-center justify-center w-5/12 mx-auto'>
        <UploadField
          label=''
          value={file}
          {...{handleChange}}
          className="rounded-none"
          accept="image/*, video/*"
        />
        <Button text="Submit" className='mt-5 w-3/12' />
      </div>
    </div>
  )
}
