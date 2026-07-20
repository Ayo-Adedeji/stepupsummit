import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Home from "./pages/Home";
import About from "./pages/About";
import PastEditions from "./pages/PastEditions";
import Speakers from "./pages/Speakers";
import PitchDeck from "./pages/PitchDeck";
import Sponsors from "./pages/Sponsors";
import Incubation from "./pages/Incubation";
import Team from "./pages/Team";
import Register from "./pages/Register";
import VerifyTicket from "./pages/VerifyTicket";

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/past-editions" element={<PageWrapper><PastEditions /></PageWrapper>} />
        <Route path="/speakers" element={<PageWrapper><Speakers /></PageWrapper>} />
        <Route path="/pitch-deck" element={<PageWrapper><PitchDeck /></PageWrapper>} />
        <Route path="/sponsors" element={<PageWrapper><Sponsors /></PageWrapper>} />
        <Route path="/incubation" element={<PageWrapper><Incubation /></PageWrapper>} />
        <Route path="/team" element={<PageWrapper><Team /></PageWrapper>} />
        <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />
        <Route path="/verify/:qrId" element={<VerifyTicket />} />
        <Route path="*" element={<PageWrapper><Home /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return <AnimatedRoutes />;
}

export default App;
