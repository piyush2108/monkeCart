import React from 'react'

function Footer() {
  return (
     <div className="footer">
          <div className="upper-footer">
               <p id="tagline">Shop with monkey cart and get a free banana🍌</p>
               
          </div>
          <div className="lower-footer">
                    <div className="footer-contact">
                         <p id="logo-footer">Monke Cart</p>
                         <div className="social-handles">
                              <p className="social-handle">
                                   <a target='_blank' href='https://www.instagram.com/2108_piyush/'>
                                        Instagram
                                   </a>
                              </p>
                              <p className="social-handle">
                                   <a target='_blank' href='https://www.linkedin.com/in/piyush-sharma01/'>
                                        LinkedIn
                                   </a>
                              </p>
                              <p className="social-handle">
                                   <a target='_blank' href='https://github.com/piyush2108'>
                                        Github
                                   </a>
                              </p>
                         </div>
                    </div>
                    <div className="footer-about">
                         <ul className="footer-list">
                              <li id="list-title" className="list-item">About</li>
                              <li className="list-item">Our Story</li>
                              <li className="list-item">Blog</li>
                              <li className="list-item">Sustainability</li>
                              <li className="list-item">FAQs</li>
                         </ul>
                    </div>
                    <div className="footer-help">
                         <ul className="footer-list">
                              <li id="list-title" className="list-item">Help</li>
                              <li className="list-item">Contact</li>
                              <li className="list-item">Reviews</li>
                              <li className="list-item">Privacy Policy</li>
                              <li className="list-item">Services</li>
                         </ul>
                    </div>
          </div>
          <div className="bottom-footer">
               <p id="bottom-text">Copyright 2020 © Designed and Developed by Piyush</p>
          </div>
     </div>
  )
}

export default Footer