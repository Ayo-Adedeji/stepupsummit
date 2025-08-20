import React from 'react'
import TicketPage from '../components/TicketPage'
import RegistrationOptions from '../components/RegistrationOptions'
import SponsorshipPackages from '../components/SponsorshipPackages'
import PaymentInstructions from '../components/PaymentInstructions'
import ContactUs from '../components/ContactUs'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const Tickets = () => {
  return (
    <div>
        <Navbar/>
       <TicketPage/> 
       <RegistrationOptions/>
       <SponsorshipPackages/>
       <PaymentInstructions/>
       <ContactUs/>
       <Footer/>
    </div>
  )
}

export default Tickets