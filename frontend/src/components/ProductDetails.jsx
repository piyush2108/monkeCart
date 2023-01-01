import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import { useSelector, useDispatch } from 'react-redux'
import { getProductDetails } from '../actions/productActions'

function ProductDetails({}) {

     const {id} = useParams()
     const dispatch = useDispatch()
     const { product, loading, error} = useSelector(state => state.productDetails)
     useEffect(()=>{
          dispatch(getProductDetails(id))
     }, [dispatch, id])

     const options = {
          edit: false,
          color: "#FFFFFF",
          activeColor: "#FF1E1E",
          value: product.ratings,
          isHalf: true,
          size: window.innerWidth < 600 ? 20 : 25
     }

     return (
          <>
               <div className="product-details-container">
                    <div className="product-images">
                         {product.images && product.images.map((image, i) => (
                              <img id="product-image" key={image.url} src={image.url} alt={`slide: ${i}`} />
                         ))}
                    </div>
                    <div className="product-details">
                         <p id="detail-name" className="product-detail-info">{product.name}</p>
                         <p id="detail-desc" className="product-detail-info">{product.description}</p>
                         <p id="detail-category" className="product-detail-infog">{product.category}</p>
                         <ReactStars {...options}/>
                         <p id="detail-ratings" className="product-detail-info">{product.noOfReviews} {product.noOfReviews > 1 ? "reviews" : "review"}</p>
                         <p id="detail-price" className="product-detail-info">₹{product.price}</p>
                         <p id="detail-stock" className="product-detail-info">{product.stock > 0 ? `Stock: ${product.stock}` : "Out of Stock"}</p>
                    </div>
               </div>
               <div className="product-action-container">
                    <div className="product-cart">
                         <div className="cart-btn">
                              <button id="decrement-btn" className="btn">-</button>
                              <button id="increment-btn" className="btn">+</button>
                         </div>
                         <p id="cart-value">0</p>
                         <button id="cart-add" className="btn">Add to cart</button>
                    </div>
                    <div className="product-review-action">
                         <p>Add Reviews</p>
                    </div>
                    <div className="product-reviews">
                         <p>Customer Reviews</p>
                         
                    </div>
               </div>
          </>
     )
}

export default ProductDetails