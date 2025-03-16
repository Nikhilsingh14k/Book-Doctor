import React, { useState } from 'react'
import {assets} from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
const Navbar = () => {
    const Navigate=useNavigate()
    //const token=1
   const {token,setToken,userData}=useContext(AppContext)
    const [showMenu, setShowMenu]=useState(false)

    const logout=()=>{
      setToken(false)
      localStorage.removeItem('token')
    }

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400 '>
      <img className='w-44 cursor-pointer rounded-2xl' src={assets.logo} alt="" />
      <ul className='hidden md:flex items-start gap-5 font-medium '>
        <NavLink to='/'>
            <li className='py-1'>Home</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
        </NavLink>
        <NavLink to='/doctors'>
            <li className='py-1'>Doctors</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
        </NavLink>
        <NavLink to='/about'>
            <li className='py-1'>About</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/contact'>
            <li className='py-1'>Contact</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <a href="https://admin-plz7.onrender.com" target="_blank" rel="noopener noreferrer">
    <button className="py-2 px-4 bg-primary text-white rounded">Admin Panel</button>
      </a>  
      </ul>
    <div className='flex items-center gap-4'>
       { token && userData?<div className='flex items-center gap-2 cursor-pointer group relative'>
        <img className='w-8 rounded-full' src={userData.image} alt="" />
        <img className='w-2.5' src={assets.dropdown_icon} alt="" />
        <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block' >
            <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                <p onClick={()=>Navigate('/my-profile')} className='hover:text-black cursor-poointer'>My Profile</p>
                <p onClick={()=>Navigate('/my-appointments')} className='hover:text-black cursor-poointer'>My Appointments</p>
                <p onClick={logout} className='hover:text-black cursor-poointer'>Logout</p>
            </div>
        </div>
       </div>
        :<button onClick={()=>Navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block '>
            Create Account
        </button>}
    </div>
    </div>
  )
}

export default Navbar
