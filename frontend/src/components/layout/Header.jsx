import React from 'react'
import cartIcon from '../../assets/shopping-cart.png'
import userIcon from '../../assets/user.png'
import menuIcon from '../../assets/menu.png'

function Header() {
  return (
    <div className="container">
      <div className="header">
        <div className="logo">
          <p id="logo-text">Monke Cart</p>
        </div>
        <div className="nav-items">
            <p className="nav-item-text">home</p>
            <p className="nav-item-text">shop</p>
            <p className="nav-item-text">contact</p>
            <img className="img-icon-header nav-item-icon" src={cartIcon} alt="cart-icon" />
            <img className="img-icon-header nav-item-icon" src={userIcon} alt="user-icon" />
        </div>
      </div>
    </div>
  )
}

export default Header