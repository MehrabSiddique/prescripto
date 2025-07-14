import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className=' text-gray-700 font-medium '>US</span></p>
      </div>


      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px] ' src={assets.about_image} alt="" />

        <div className='flex flex-col gap-6 justify-center md:w-2/4 text-sm text-gray-600'>
          <p>At Prescripto, we believe that healthcare should be accessible, convenient, and patient-focused. Our platform connects patients with trusted, verified medical professionals across a wide range of specialties — all in just a few clicks.</p>
          <p>We simplify the process of booking doctor appointments by offering a user-friendly interface, real-time availability, and personalized doctor recommendations. Whether you're looking for a general physician, specialist, or urgent care, we've got you covered.

          </p>
          <b className='text-gray-800'>Our Mission</b>
          <p>To empower individuals with instant access to quality healthcare by bridging the gap between patients and doctors through secure, digital appointment scheduling.</p>


        </div>
      </div>
      <div className='text-xl my-4'>
        <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span> </p>
      </div>

      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b> Efficiency:</b>
          <p>Streamlined appointment scheduling that fits into your busy life.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Convenience:</b>
          <p>Access to a network of trusted healthcare professionals in your area.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b> Personalization:</b>
          <p> Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>

    </div>

  )
}

export default About