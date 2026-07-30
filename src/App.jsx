import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import PastEditions from "./pages/PastEditions";
import Speakers from "./pages/Speakers";
import PitchDeck from "./pages/PitchDeck";
import Sponsors from "./pages/Sponsors";
import Incubation from "./pages/Incubation";
import Team from "./pages/Team";
import Register from "./pages/Register";
import PaymentVerify from "./pages/PaymentVerify";
import SponsorPaymentVerify from "./pages/SponsorPaymentVerify";
import VerifyTicket from "./pages/VerifyTicket";

const AnimatedRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/past-editions" element={<PastEditions />} />
      <Route path="/speakers" element={<Speakers />} />
      <Route path="/pitch-deck" element={<PitchDeck />} />
      <Route path="/sponsors" element={<Sponsors />} />
      <Route path="/incubation" element={<Incubation />} />
      <Route path="/team" element={<Team />} />
      <Route path="/register" element={<Register />} />
      <Route path="/payment/verify" element={<PaymentVerify />} />
      <Route path="/payment/sponsor-verify" element={<SponsorPaymentVerify />} />
      <Route path="/verify/:qrId" element={<VerifyTicket />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

function App() {
  return <AnimatedRoutes />;
}

export default App;
