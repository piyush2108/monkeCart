import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'

const options = {
     edit: false,
     color: "#FFFFFF",
     activeColor: "#FF1E1E",
     value: 2.5,
     isHalf: true,
     size: window.innerWidth < 600 ? 20 : 25
}

function Product({product}) {
  return (
     <Link className="product-card" to={ product._id }>
          <img id="product-img" src={ product.images[0].url } alt={ product.name }/>
          <p id="product-name">{ product.name }</p>
          <div id="product-rating">
               <ReactStars {...options}/><span id="product-review">(256)</span>
          </div>
          <p id="product-price">₹{ product.price }</p>
     </Link>
  )
}

export default Product