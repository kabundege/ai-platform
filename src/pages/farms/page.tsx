import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../Components/Button';
import FarmOne from '../../Components/farm';
import Input from '../../Components/Input';
import { StoreContext } from '../../context';
import { farmSchema } from '../../validation/auth.schema';

const testFarm = (length:number) => Array.from({length},(_,i)=> ({ name: `Farm ${String(i).padStart(2,'0')}` }))

const Farms = () => {
  const { user } = useContext(StoreContext)
  const [ farms,setFarm ] = useState<{name:string}[]>([])

  useEffect(()=>{
    if(user){
      if(user.isAdmin){
        setFarm(testFarm(15))
      }else{
        // setFarm(testFarm(5))
      }
    }
  },[user])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name:string }>({
    reValidateMode: 'onChange',
    resolver: yupResolver(farmSchema),
  });  

  const submitHandler = handleSubmit(({name})=>{
    setFarm(prev => [{name},...prev])
  })
  
  return (
    <div className='w-full'>
      <section className='flex justify-between items-end max-w-5xl mx-auto  mb-10'>
        <div>
          <h1 className='text-left text-5xl text-gray-700 my-2 font-black'>Check on your farms</h1>
          <p className="text-left text-xl text-gray-400">Find here details on your farms</p>
        </div>
        <form onSubmit={submitHandler} className='w-fit flex justify-between items-start'>
          <Input placeholder='Farm name' register={register('name')} error={errors.name?.message}  />
          <Button text={<span className='text-sm'> &#43; Add Farm</span>} className='bg-borange ml-5' />
        </form>
      </section>
      <div className={`h-full w-full max-w-5xl mx-auto grid ${farms[0]&&'grid-cols-4'} gap-3`}>
        { 
          React.Children.toArray(
            farms[0] ?
            farms.map(({name},index)=><FarmOne {...{name,index}} />) :
            (
              <h1 className='text-center w-full text-4xl mt-20 text-gray-200'>
                No farm added yet
              </h1>
            )
          )
        }
      </div>
    </div>
  )
}

export default Farms
