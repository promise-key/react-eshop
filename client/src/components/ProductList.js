import React from 'react'
import axios from 'axios'

export const ProductList = ({ productList }) => {
  // console.log('product list', productList)
  const products = productList.data.products
  //console.log('products', products[0]);
  if (!products.length) {
    return <p className="center">No products available.</p>
  }



  const addToCartHandler = product => {
    console.log('product clicked', product)

  }

  return (
    <div className="row products">
    { products.map((product) => {
      return (
        <div className="col s6 m4 l3" key = {product.name+product.id}>
          <div className="card">
            <div className="card-image">
              <img src={product.image} alt={product.name}/>
            </div>
            <div className="card-content">
              <span>{product.name}</span>
              <span className="productCountry">{product.country}</span>
              <span className="priceWeight">
                <span>${product.price}</span>
                <span>{product.weight} g.</span>
              </span>
            </div>
            <div className="card-action">
              { product.stock_number
                ? <button
                  className="btn amber accent-3 black-text"
                  onClick = { () => addToCartHandler(product) } >
                  Add to cart</button>
                : <span className='outOfStock'>Out of stock</span> }
            </div>
          </div>
        </div>
      )
    })}
    </div>
  )
}
