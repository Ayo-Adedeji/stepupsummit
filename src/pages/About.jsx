import React from 'react'
import HeroPage from '../components/HeroPage'
import AboutPage from '../components/AboutPage'
import VideoPage from '../components/VideoPage'
import Wim from '../components/Wim'
import Focus from '../components/Focus'
import Navbar from '../components/Navbar'
import Sponsors from '../components/Sponsors'
import Seats from '../components/Seats'
import Footer from '../components/Footer'

const About = () => {
  return (
    <div>
        <Navbar/>
        <HeroPage/>
        <AboutPage/>
        <VideoPage/>
        <Wim/>
        <Focus/>
        <Sponsors/>
        <Seats/>
        <Footer/>
    </div>
  )
}

export default About