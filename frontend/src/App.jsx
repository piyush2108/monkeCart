import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import webFont from 'webfontloader'

//components
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './components/layout/Home'
import Shop from './components/layout/Shop'

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
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
      </Routes>
        <Footer />
    </Router>
  )
}

export default App
