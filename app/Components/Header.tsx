import React from 'react'
import logo from '../../public/assets/ai_logo.png'
import { flexer } from '../../styles/comon.styles'
import { TbLogin } from 'react-icons/tb'
import Image from 'next/image'
import Link from 'next/link'

 const Header = () => {
  return (
    <header className={flexer+'w-11/12 md:w-full md:max-w-5xl mx-auto'}>
        <div className='flex items-center flex-1'>
            <Image className='w-24 relative -left-6' src={logo} alt="" />
            <ul className={flexer+"hidden md:flex"}>
                <li className='mr-5 group'>
                    <Link href='/' className='text-base font-light'>Our Works</Link>
                    <div className='w-0 group-hover:w-1/2 border-b-2 border-gray-300' />
                </li>
                <li className='mr-5 group'>
                    <Link href='/' className='text-base font-light'>Service</Link>
                    <div className='w-0 group-hover:w-1/2 border-b-2 border-gray-300' />
                </li>
                <li className='mr-5 group'>
                    <Link href='/' className='text-base font-light'>Products</Link>
                    <div className='w-0 group-hover:w-1/2 border-b-2 border-gray-300' />
                </li>
            </ul>
        </div>
        <Link href='/login' className='bg-black rounded-md hover:bg-gray-800 cursor-pointer py-2 px-5 flex items-center group'>
            <button className='text-white text-sm'>
                Log In
            </button>
            <TbLogin className='text-white ml-2 text-xs group-hover:translate-x-1 transition ease-linear rotate-180' />
        </Link>
    </header>
  )
}

export default Header
