import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import webFont from 'webfontloader'

//components
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './components/layout/Home'
import Shop from './components/layout/Shop'
import Loader from './components/Loader'

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
        <Route path='/' element={<Navigate to="/home"/>} />
        <Route path='/home' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/load' element={<Loader />} />
      </Routes>
        <Footer />
    </Router>
  )
}

export default App
