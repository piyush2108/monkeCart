import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProduct } from '../../actions/productActions'
import Product from '../Product'
import Loader from '../Loader'

function Shop() {

     const dispatch = useDispatch()
     const { loading, error, products, productsCount }  = useSelector(state => state.products)

     useEffect(()=>{
          dispatch(getProduct())
     }, [dispatch])

     return (
          <>
               {loading ? <Loader /> : 
               <>   
                    <div className="shop-header">
                         <p id="shop-heading">Featured products</p>
                    </div>
                    <div className="products-container">
                         {products && products.map((product) => 
                              <Product key={product._id} product={product}/>
                         )}
                         
                    </div>
               </>  
               }
          </>
     )
}

export default Shop