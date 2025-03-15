import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10  mt-40 text-sm'>
        {/* left */}
        <div>
      <img className='mb-5 w-40' src={assets.logo} alt="" />
      <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus nostrum porro debitis, ducimus ab quibusdam, non asperiores tempore placeat dignissimos dolores magnam voluptates necessitatibus ipsam delectus maxime commodi veniam tempora.</p>
        </div>
         {/* mid*/}
         <div>
         <p className='text-xl font-medium mb-5'>Company</p>
         <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privaacy and policy</li>
         </ul>
         </div>
          {/* right*/}
          <div>
          <p className='text-xl font-medium mb-5'>
            Get in Touch
          </p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+91-8840791221</li>
            <li>nikhilsingh14k@gmail.com</li>
          </ul>
          </div>
      </div>
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copywrite ------------- end</p>
      </div>
    </div>
  )
}

export default Footer
