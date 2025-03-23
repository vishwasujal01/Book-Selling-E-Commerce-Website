import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-0 text-sm'>
        
        <div>
            <img src={assets.logo} className='mb-5 w-24' alt="" />
            <p className='w-full md:w-2/3 text-gray-600'>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur unde modi nemo architecto eius nulla sit suscipit consectetur molestiae impedit quasi distinctio dolor magnam quae sequi saepe, incidunt maxime ratione. Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum est esse expedita architecto impedit, deleniti dolorum voluptate facere cumque voluptates beatae. Dolore, adipisci fuga vero alias et ipsa culpa debitis!
            </p>
        </div>

        <div>
            <p className='text-xl font-medium mb-5 mt-10'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>

        <div>
            <p className='text-xl font-medium mb-5 mt-10'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>+1-212-456-7890</li>
                <li>contact@foreveryou.com</li>
            </ul>
        </div>

      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2024@ forever.com - All Right Reserved</p>
      </div>
    </div>
  )
}

export default Footer
