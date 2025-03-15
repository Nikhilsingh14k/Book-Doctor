import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useEffect } from 'react'
import { assets } from '../../assets/assets'
const DoctorDashboard = () => {

    const {dToken,dashData,setDashData, getDashData}=useContext(DoctorContext)

    useEffect(()=>{
   if(dToken){
    getDashData()
   }
    },[dToken])
  return dashData && (
    <div className='m-5'>
       <div className='flex flex-wrap gap-3'>
      
              <div className='flex items-center gap-2 bg-white min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                <img className='w-14' src={assets.earning_icon} alt="" />
                <div>
                  <p className='text-xl font-semibold text-gray-600' >₹ {dashData.earnings}</p>
                  <p className='text-gray-500'>Earnings</p>
                </div>
              </div>
      
           
      
              <div className='flex items-center gap-2 bg-white min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                <img className='w-14' src={assets.appointment_icon} alt="" />
                <div>
                  <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
                  <p className='text-gray-500'>Appointments</p>
                </div>
              </div>
      
              <div className='flex items-center gap-2 bg-white min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                <img className='w-14' src={assets.patients_icon} alt="" />
                <div>
                  <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
                  <p className='text-gray-500'>Patients</p>
                </div>
              </div>
      
            </div>
            <div className='bg-white'>
                    <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
                      <img src={assets.list_icon} alt="" />
                      <p className='font-semibold'>Latest Bookings</p>
                    </div>
                    <div className='pt-4 border border-t-0'>
                     {
                      dashData.latestAppointments.map((item,index)=>(
                       
                        <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
                          {/* {console.log(item.userData)}
                        {console.log("userData.name:", item.userData?.name)} */}
                          <img className='rounded-full w-10' src={item.userData.image} ></img>
                          <div className='flex-1 text-sm'>
                            <p className='text-gray-800'>{item.userData.name}</p>
                            <p className='text-gray-800'>{item.slotDate}</p>
                          </div>
                           </div>
                      ))
                     }
                    </div>
                  </div>
    </div>
  )
}

export default DoctorDashboard
