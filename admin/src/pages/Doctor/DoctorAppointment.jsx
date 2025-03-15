import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useEffect } from 'react'

const DoctorAppointment = () => {

  const {dToken,appointments,getAppointments}=useContext(DoctorContext)


  useEffect(()=>{
    if(dToken){
        getAppointments()
    }
  },[dToken])

  return (
    <div className='w-full maxw-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appoiintments</p>
      <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll min-h-[50vh]'>
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_3fr_1fr] gap-1 py-3 px-6 border-b'>
            <p>#</p>
            <p>Patient</p>
            <p>Payment</p>

            <p>Date & Time</p>
            <p>Fees </p>
           
        </div>
        {
            appointments.map((item,index)=>(
                <div className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_3fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-100' key={index}>
                    <p className='max-sm-hidden'>{index+1}</p>
                    <div className='flex items-center gap-2'>
                        <img className='w-8 rounded-full' src={item.userData.image} alt="" /><p>{item.userData.name}</p>
                    </div>
                    <div>
                        <p className='text-xs inline border border-primary px-2 rounded-full'>
                            {item.payment ?'Online':'Cash'}
                        </p>
                    </div>
                    <div>
                        <p>{item.slotDate} ,{item.slotTime}</p>    
                    </div>
                   <div>
                    <p>{item.amount}</p>
                    </div>

                </div>
            ))
        }
      </div>
    </div>
  )
}

export default DoctorAppointment
