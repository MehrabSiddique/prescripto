import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Footer = () => {
    return (
        <div className='md:mx-10'>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm '>
                {/*------left side ------*/}
                <div>
<img className='mb-5 w-40' src={assets.logo} alt="" />
<p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum voluptates commodi inventore, delectus qui vel, aliquid voluptatibus quas animi accusantium quidem officia atque architecto nam provident corrupti beatae tenetur deleniti?</p>
                </div>

                {/*------centerside ------*/}

                <div>
<p className='text-xl font-medium mb-5'>COMPANY</p>
<ul className='flex flex-col gap-2 text-gray-600'>
<li>Home</li>
<li>About us</li>
<li>Contact us</li>
<li>Privacy policy</li>

</ul>
                </div>

                {/*------rigtt side ------*/}

                <div>
<p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
<ul className='flex flex-col gap-2 text-gray-600'>
<li>+92 301-2345678</li>
<li >mehrabsaddique@gmail.com</li>
</ul>
                </div>
            </div>

            {/*------copy right text ------*/}
            <div>
<hr />

            </div>
<p className='py-5 text-sm text-center'>&copy;Copyright 2025 Prescripto-All Right Reseved.</p>
        </div>
    )
}

export default Footer