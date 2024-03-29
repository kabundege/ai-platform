import React, { useContext } from 'react'
import logo from '../assets/ai_logo.png'
import { flexer } from '../constants/comon.styles'
import { TbLogin } from 'react-icons/tb'
import { NavLink,Link, useNavigate, useLocation } from 'react-router-dom'
import { Image } from './Image'
import { StoreContext } from '../context'

 const Header = () => {
    const { isAuth,logout } = useContext(StoreContext)
    const navigation = useNavigate()
    const {pathname} = useLocation()

    const handleAuth = () => {
        if(!isAuth){
            navigation('/login')
        }else{
            logout()
        }
    }
    
    return (
        <header className={flexer+'w-11/12 md:w-full md:max-w-5xl mx-auto'}>
            <div className='flex items-center flex-1'>
                <Link to="/">
                    <Image className='w-24 relative -left-6' src={logo} />
                </Link>
                <ul className={flexer+"hidden md:flex"}>
                    <li className='mr-5 group'>
                        <NavLink to='/contacts' className='text-base font-light'>Contacts</NavLink>
                        <div className={`${pathname==='/contacts'?'w-1/2':'w-0 group-hover:w-1/2'} border-b-2 border-gray-300`} />
                    </li>
                    <li className={` ${!isAuth&&"hidden"} mr-5 group`}>
                        <NavLink to='/service' className='text-base font-light'>Service</NavLink>
                        <div className={`${pathname==='/service'?'w-1/2':'w-0 group-hover:w-1/2'} border-b-2 border-gray-300`} />
                    </li>
                    <li className={` ${!isAuth&&"hidden"} mr-5 group`}>
                        <NavLink to='/dashboard' className='text-base font-light'>Dashboard</NavLink>
                        <div className={`${pathname==='/dashboard'?'w-1/2':'w-0 group-hover:w-1/2'} border-b-2 border-gray-300`} />
                    </li>
                    <li className={` ${!isAuth&&"hidden"} mr-5 group`}>
                        <NavLink to='/farms' className='text-base font-light'>Farms</NavLink>
                        <div className={`${pathname==='/farms'?'w-1/2':'w-0 group-hover:w-1/2'} border-b-2 border-gray-300`} />
                    </li>
                </ul>
            </div>
            <div onClick={handleAuth} className='bg-black hover:bg-gray-800 cursor-pointer py-2 px-5 flex items-center group'>
                <button className='text-white text-sm'>
                    {isAuth?"Log Out":"Log In"}
                </button>
                <TbLogin className={`text-white ml-2 text-xs ${isAuth?"transform rotate-180":""} group-hover:translate-x-1 transition ease-linear rotate-180`} />
            </div>
        </header>
    )
}

export default Header
