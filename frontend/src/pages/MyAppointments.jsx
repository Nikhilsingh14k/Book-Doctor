import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const MyAppointments = () => {

  const {backendUrl,token,getDoctorsData}=useContext(AppContext)
  const [appointments,setAppointments]=useState([])
  const months=['Jan','Feb','March','April','May','June','July','August','Sep','Oct','Nov','Dec']
  const navigate=useNavigate()
  const slotDateFormat=(slotDate)=>{
    const dateArray=slotDate.split('_')
    return dateArray[0]+" "+months[Number(dateArray[1])-1]+" "+dateArray[2]
  }

  const getUserAppointments=async()=>{
    try {
      const {data}=await axios.get(backendUrl+'/api/user/appointments',{headers:{token}})
      if(data.success){
        setAppointments(data.appointments.reverse())
        navigate('/my-appointments')
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

 const cancelAppointment=async(appointmentId)=>{
  try {
    const {data}=await axios.post(backendUrl+'/api/user/cancel-appointment',{appointmentId},{headers:{token}})
    if(data.success){
      toast.success(data.message)
      getUserAppointments()
      getDoctorsData()
    }else{
      toast.error(data.message)
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message)
  }
 }
 const initPay=(order)=>{
   const options={
    key:import.meta.env.META_RAZORPAY_KEY_ID,
    amount:order.amount,
    currency:order.currency,
    name:'Appointment Payment',
    description:'Appointment Payment',
    order_id:order.id,
    receipt:order.receipt,
    handler:async(response)=>{
     console.log(response)
     try {
      const {data}=await axios.post(backendUrl+'/api/user/verifyRazorpay',response,{headers:{token}})
      if(data.success){
        getUserAppointments()
      }
     } catch (error) {
      
     }
    }
   }
   const rzp=new window.Razorpay(options)
   rzp.open()
 }
 const appointmentRazorpay=async(appointmentId)=>{
try {
  const {data}=await axios.post(backendUrl+'/api/user/payment-razorpay',{appointmentId},{headers:{token}})
  if(data.success){
    initPay(data.order)
  }
} catch (error) {
  
}
 }

  useEffect(()=>{
    if(token){
      getUserAppointments()
    }
  },[token])

  return (
    <div>
      <p className='pb-3 mt-12 text-lg font-medium text-gray-600 border-b'>My Appointments</p>
      <div>
        {appointments.map((item,index)=>(
         <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b' key={index}>
          <div>
            <img className='w-36 bg-[#EAEFFF]' src={item.docData.image} alt="" />
          </div>
          <div className='flex-1 text-sm text-[#5E5E5E]'>
            <p className='text-[#262626] text-base font-semibold'>{item.docData.name}</p>
            <p>{item.docData.speciality}</p>
            <p className='text-[#464646] font-medium mt-1'>Address:</p>
            <p>{item.docData.address.line1}</p>
      
            <p className=' mt-1'><span className='text-sm text-[#3C3C3C] font-medium'>Date & Time:</span>{slotDateFormat(item.slotDate)} | {item.slotTime}</p>
          </div>
          <div></div>
          <div className='flex flex-col gap-2 justify-end text-sm text-center'>
          {!item.cancelled && item.payment && <button  className='sm:minw-48 py-2 border rounded text-stone-500 bg-green-500'>Paid</button>}
          {!item.cancelled && !item.payment &&  <button onClick={()=>appointmentRazorpay(item._id)} className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Pay online</button>}
           {!item.cancelled && <button onClick={()=>cancelAppointment(item._id)} className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel appointment</button>}
           {item.cancelled && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment cancelled</button>}
          </div>
         </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments
