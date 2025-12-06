import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import Welcome from './components/Welcome'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={
            <>
              <Navbar />
              <Home />
            </>
          } />
          <Route path="/about" element={
            <>
              <Navbar />
              <About />
            </>
          } />
          <Route path="/services" element={
            <>
              <Navbar />
              <Services />
            </>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App

