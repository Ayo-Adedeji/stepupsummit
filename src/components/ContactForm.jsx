import React from 'react'

const ContactForm = () => {
  return (
    <form className=''>
    <div className='max-w-2xl mx-auto bg-gray-100 p-5 rounded-lg mb-5'>
        <p>First Name</p>
        <input className='border rounded-md w-full p-2 mb-5 outline-none' type='text' name='firstName' />
        <p>Your Email</p>
        <input className='border rounded-md w-full p-2 mb-5 outline-none'  type='email' name='email' />
        <textarea
            name="message"
            className="border  w-full border-primaryBlue bg-secondary rounded-xl p-3 outline-none h-36 mt-5 mb-5"
            placeholder="Your message"
            required
          ></textarea>
          <a className='border px-8 py-3 bg-primaryBlue text-[#ffff] rounded-xl hover:bg-accentLightBlue transition-all duration-300 ease-in-out hover:cursor-pointer'>Submit</a>
        
    </div>
    <div className="mt-12 mb-16 text-center">
          <p className="text-xl font-bold text-accentYellowDark">
            Step up. <span className="text-primaryBlue">Stand out.</span>{" "}
            <span className="text-green-600">Shape the future.</span>
          </p>
        </div>
    </form>
  )
}

export default ContactForm