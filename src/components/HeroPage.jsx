import React from 'react'
import imag2 from "../assets/imag2.jpg";
import Navbar from './Navbar';

const HeroPage = () => {
  return (
    
    <section > 
       
    <div className='h-[80vh] bg-cover text-center flex flex-col justify-center text-[#ffffff] '
    style={{ backgroundImage: `url(${imag2})`}}>
        <h1 className='text-7xl font-semibold'>About</h1>
        <p className='font-semibold'>Step-Up Summit</p>
</div>
    </section>
  )
}

export default HeroPage;