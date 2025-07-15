import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets_admin/assets'

const DoctorAppointments = () => {
  const {calculateAge, slotDateFormat, currency } = useContext(AppContext)

  const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext)

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])


  return (
    <div className='w-full max-w-6xl m-5'>

      <p className='text-lg font-medium mb-3'>DoctorAppointments </p>
      <div className='bd-white border rounded text-sm min-h-[50vh] max-h-[80vh] overflow-y-scroll'>
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b '>

          <p>#</p>
          <p>Patient </p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

{
  appointments.reverse().map((item,index) =>(
<div className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 item-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50 ' key={index}>

  <p className='max-sm:hidden'>{index+1}</p>
<div className='flex item-center gap-2'>
  <img className='w-8 rounded-full' src= {item.userData.image} alt="" />
   <p> {item.userData.image} </p>
</div>

<div>
<p className='text-xs inline-block border-primary px-2 rounded-full'> 
  {item.payment ? 'Online' : 'CASH'} </p>
</div>

<p className='max-sm:hidden'> {calculateAge(item.useData.dob)} </p>
<p>{slotDateFormat(item.slotDate)}, {item.slotTime} </p>
<p>{currency}{item.amount} </p>
{
  item.cancelled ?
  <p className='text-red-400 text-xs font-medium'>Cancelled </p>
  :item.iscompleted ?
  <p className='text-green-500 text-xs font-medium'>Completed</p>
  : <div className='flex'>
  <img onClick={()=>cancelAppointment(item._id)} className='w-10 cursor-pointer' src= {assets.cancel_icon} alt="" />
  <img onClick={()=>completeAppointment(item._id)} className='w-10 cursor-pointer' src= {assets.tick_icon} alt="" />
</div>
   
}



</div>

  ))
}

      </div>

    </div>
  )
}

export default DoctorAppointments