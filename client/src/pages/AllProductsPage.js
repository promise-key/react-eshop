import React, {useState, useEffect, useCallback} from 'react'
import axios from 'axios'
import {Loader} from '../components/Loader'
import {ProductList} from '../components/ProductList'

export const AllProductsPage = () => {
  const [products, setProducts] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchProducts = useCallback(async () => {
    try {
      const proxy = 'http://localhost:5000'
      const fetched = await axios.get(proxy+'/api/products')
      setProducts(fetched)
      setTimeout( () => {
        setLoading(false)
      }, 1000)
    } catch (e) {
      console.log('fetchProducts error \n', e.response, e);
    }
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  if (loading) {
    return <Loader/>
  }

  return (
    <div>
      {!loading && <ProductList productList={products} />}
    </div>
  )
}
