import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import webFont from 'webfontloader'

//components
import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'

import './App.css'

function App() {

  useEffect(() => {
    webFont.load({
      google: {
        families: ['Montserrat', 'Cedarville Cursive', 'Gochi Hand', 'Roboto Mono']
      }
    });
   }, []);

  return(
    <Router>
        <Header />
      <Routes>
        {/* <Route path='/shop' element={<Products />} />
        <Rotue path='/user' elemet={<User />} />
        <Route path='/cart' element={<Cart  />} /> */}
      </Routes>
        <Footer />
    </Router>
  )
}

export default App
