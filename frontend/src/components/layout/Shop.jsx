import React from 'react'
import Product from '../Product'

const product = {
     name: "Black Pen",
     price: "400",
     images: [{ url: "https://picsum.photos/200/300" }],
     _id: "random id"
}

function Shop() {
  return (
     <>
          <div className="shop-header">
               <p id="shop-heading">Featured products</p>
          </div>
          <div className="products-container">
               <Product product={product}/>
               <Product product={product}/>
               <Product product={product}/>
               <Product product={product}/>
               <Product product={product}/>
               <Product product={product}/>
               <Product product={product}/>
               <Product product={product}/>
          </div>
     </>
  )
}

export default Shop