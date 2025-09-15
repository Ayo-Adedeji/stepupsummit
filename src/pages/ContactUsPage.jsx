import React from 'react'
import Navbar from '../components/Navbar'
import ContactUs from '../components/ContactUs'
import Seats from '../components/Seats'
import News from '../components/News'
import Footer from '../components/Footer'

const ContactUsPage = () => {
  return (
    <div>
        <Navbar/>
        <ContactUs/>
        <Seats/>
        <News/>
        <Footer/>
    </div>
  )
}

export default ContactUsPage