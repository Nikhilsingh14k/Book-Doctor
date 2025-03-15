import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
const Doctors = () => {
  const {doctors}=useContext(AppContext)
    const {speciality}=useParams()
    const [filterDoc,setFilterDoc]=useState([])
    const navigate=useNavigate()
    const applyFilter=()=>{
        if(speciality){
            setFilterDoc(doctors.filter(doc=>doc.speciality=== speciality))
        }
        else{
            setFilterDoc(doctors)
        }
    }

    // whenever speciality changes
    useEffect(()=>{
     applyFilter()
    },[doctors,speciality])
  return (
    
    <div>
      <p className='text-gray-600'>Browse through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <div className='flex-col gap-4 text-sm text-gray-600 hidden sm:flex'>
            <p  onClick={()=>navigate('/doctors/General physician')} className='w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer '>General physician</p>
            <p onClick={()=>navigate('/doctors/Gynecologist')} className='w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer '>Gynecologist</p>
            <p onClick={()=>navigate('/doctors/Dermatologist')} className='w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer '>Dermatologist</p>
            <p onClick={()=>navigate('/doctors/Pediatricians')} className='w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer '>Pediatricians</p>
            <p onClick={()=>navigate('/doctors/Neurologist')} className='w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer '> Neurologist</p>
            <p onClick={()=>navigate('/doctors/Gastroenterologist')} className='w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer '>Gastroenterologist</p>
        </div>
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>{
          filterDoc.map((item,index)=>(
            <div onClick={()=>navigate(`/appointment/${item._id}`)} key={index} className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
                <img className='bg-[#EAEFFF]' src={item.image} alt="" />
                <div className='p-4'>
                    <div className={`flex items-center gap-2 text-sm text-center ${item.available? 'text-green-500': 'text-red-500'}`}>
                        <p className={`w-2 h-2 rounded-full ${item.available? 'bg-green-500': 'bg-red-500' }`}></p>
                        <p>{item.available?'Available':'Unavailable'}</p>
                    </div>
                    <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
                    <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
                </div>
            </div>
        ))}
        </div>
      </div>
    </div>
  )
}

export default Doctors
