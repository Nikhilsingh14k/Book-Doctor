import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'
const Appointment = () => {

    const {docId}=useParams()
    const {doctors,backendUrl,token,getDoctorsData}=useContext(AppContext)
   const [docInfo,setDocInfo]=useState(null)
   const fetchDocInfo = async()=>{
    const docInfo=doctors.find(doc=>doc._id===docId)
    setDocInfo(docInfo)
   // console.log(docInfo)
   }

   

///////////////////////////////////////////////////////////////////////////////////////////////////////
// slots
const daysOfWeek=['SUN','MON','Tue','WED','THUR','FRI','SAT']
//< new learning>// --to add in notes
const [docSlots,setDocSlots]=useState([])
const [slotIndex,setSlotIndex]=useState(0)
const [slotTime,setSlotTime]=useState('')

const navigate=useNavigate()

const getAvailableSlots = async () => {
    let slots = [];
    let today = new Date();

    for (let i = 0; i < 7; i++) {
        let currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);
        let endTime = new Date(currentDate);
        endTime.setHours(21, 0, 0, 0);

        if (today.getDate() === currentDate.getDate()) {
            currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
            currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
        } else {
            currentDate.setHours(10);
            currentDate.setMinutes(0);
        }

        let timeSlots = [];
        while (currentDate < endTime) {
            let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            
            let day=currentDate.getDate()
            let month=currentDate.getMonth()+1;
            let year=currentDate.getFullYear()
            const slotDate=day +'_'+month+'_'+year
            const slotTime=formattedTime

            const isSlotAvailable=docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime)?false:true
            if(isSlotAvailable){
                timeSlots.push({
                    datetime: new Date(currentDate),
                    time: formattedTime,
                });
            }

            
            currentDate.setMinutes(currentDate.getMinutes() + 30);
        }
        slots.push(timeSlots);
    }

    setDocSlots(slots); 
   // console.log(slots)
};

const bookAppointment=async()=>{
    if(!token){
        toast.warn('Login to book Appointment')
        return navigate('/login')
    }
    try {
        const date=docSlots[slotIndex][0].datetime
        let day=date.getDate()
        let month=date.getMonth()+1;
        let year=date.getFullYear()

         
        const slotDate=day +'_'+month+'_'+year
        const {data}=await axios.post(backendUrl+'/api/user/book-appointment',{docId,slotDate,slotTime},{headers:{token}})
        if(data.success){
            toast.success(data.message)
            getDoctorsData()
            navigate('/my-appointments')
        }else{
            toast.error(data.message)
        }
    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
}



useEffect(()=>{
    fetchDocInfo()
   },[doctors,docId])

useEffect(()=>{
    getAvailableSlots()
},[docInfo])

/////////////////////////////////////////////////////////////////////////////////////////////////////
  return docInfo && (
    <div>
      <div className='flex flex-col sm:flex-row gap-4'>
        <div >
            <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image}  alt="" />
        </div>
        <div className='flex-1 border border-[#ADADAD] rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
            <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{docInfo.name} <img className='w-5'src={assets.verified_icon} alt="" /></p>
            <div className='flex items-center gap-2 mt-1 text-gray-600'>
                <p>{docInfo.degree} - {docInfo.speciality}</p>
                <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
            </div>
            <div>
                <p className='flex items-center gap-1 text-sm font-medium text-[#262626] mt-3'>About <img className='w-3' src={assets.info_icon} alt="" /></p>
                <p className='text-sm text-gray-600 max-w-[700px] mt-1' >{docInfo.about}</p>
            </div>
            <p className='text-gray-600 font-medium mt-4'>Appointment fee: &#8377;<span className='text-gray-600'>{docInfo.fees}</span></p>
        </div>
      </div>
    {/* ---------------------- */}
     <div className='sm:ml-72 sm:pl-4 mt-8 font-medium text-[#565656]'>
        <p>Booking Slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>{
            docSlots.length && docSlots.map((item,index)=>(
             <div onClick={()=>setSlotIndex(index)} key={index} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex===index?'bg-primary text-white' : 'border border-[#DDDDDD]'} `} >
                <p>{item[0]&& daysOfWeek[item[0].datetime.getDay()]} </p>
                <p>{item[0] && item[0].datetime.getDate()} </p>

             </div>
            ))
            }</div>
            <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
                {
                    docSlots.length && docSlots[slotIndex].map((item,index)=>(
                        <p onClick={()=>setSlotTime(item.time)} className={`text-sm font-light  flex-shrink-0 px-5 py-2 rounded-full cursor-pointer text-[#949494] border border-[#B4B4B4] ${item.time===slotTime?'bg-primary text-black':'text-gray-400 border border-gray-300' }`}>
                            {item.time.toLowerCase()}
                        </p>
                    ))
                }
            </div>

            <div>
                <button onClick={bookAppointment} className='bg-primary text-white text-sm font-light px-20 py-3 rounded-full my-6'>
                    Book an Appointment
                </button>
            </div>

     </div>
    {/*  =---------------------- */}
    </div>
  )
}

export default Appointment
