import React from 'react'
import Shop from './Shop'

function Home() {
  return (
     <>
          <div className="banner">
               <p id="banner-title">hey Stranger, welcome to Monke Land</p>
               <p id="banner-subtitle">experience a new way of shopping</p>
               <p id="banner-subtitle">shop with us and get a free 🍌 on every order</p>
               <p id="banner-minor-text">➡ scroll down to find amazing products ⬅</p>
          </div>
          <Shop />
     </>
  )
}

export default Home