import React from 'react'
import SponsorshipPackages from '../components/SponsorshipPackages';
import News from '../components/News';
import Footer from '../components/Footer';
import Sponsorship from '../components/sponsorship';
import Navbar from '../components/Navbar';

const SponsorsPage = () => {
  return (
    <div>
        <Navbar/>
        <Sponsorship/>
<SponsorshipPackages/>
<News/>
<Footer/>
    </div>
  )
}

export default SponsorsPage;