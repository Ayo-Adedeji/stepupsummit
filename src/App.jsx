import { Routes, Route } from "react-router-dom"
import About from "./pages/About"
import Home from "./pages/Home"
import Tickets from "./pages/Tickets"
import SponsorsPage from "./pages/SponsorsPage"
import ContactUsPage from "./pages/ContactUsPage"
import VerifyTicket from "./pages/VerifyTicket"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/tickets" element={<Tickets />} />
      <Route path="/sponsors" element={<SponsorsPage/>}/>
      <Route path="/contact" element={<ContactUsPage/> } />
      <Route path="/verify-ticket" element={<VerifyTicket/> }/>
      {/* Optional: catch-all for 404 */}
      <Route path="*" element={<h1 className="text-center mt-20">Page Not Found</h1>} />
    </Routes>
  )
}

export default App
