import React from 'react'
import bananaIcon from '../assets/banana.png'

function Loader() {
  return (
    <>
          <div className="loader-container">
               <img id="loader-icon" src={bananaIcon} alt="banana"/>
               <h2 id="loader-text">Loading ...</h2>
               <h2 id="loader-text">eat 🍌 in the meantime</h2>
          </div>
    </>
  )
}

export default Loader