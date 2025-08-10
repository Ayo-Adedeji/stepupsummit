import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AboutSection from '../components/AboutSection'
import Stats from '../components/Stats'
import Wsa from '../components/Wsa'
import Speakers from '../components/Speakers'
import Highlights from '../components/Highlights'
import Seats from '../components/Seats'
import News from '../components/News'
import HeroSection from '../components/HeroSection'
import Head from '../components/Head'
import Sponsors from '../components/Sponsors'

const Home = () => {
  return (
    <div>
       <Navbar/>
      <Head/>
      <HeroSection/>
      <AboutSection/>
      <Stats/>
      <Wsa/>
      <Speakers/>
      <Highlights/>
      <Sponsors/>
      <Seats/>
      <News/>
      <Footer/>


    </div>
  )
}

export default Home