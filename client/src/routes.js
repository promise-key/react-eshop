import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {AllProductsPage} from './pages/AllProductsPage'
import {ShoppingCartPage} from './pages/ShoppingCartPage'
import {AuthPage} from './pages/AuthPage'
import {ProductPage} from './pages/ProductPage'

export const useRoutes = isAuthorised => {
  if (isAuthorised) {
    return (
      <Switch>
        <Route path="/cart" exact>
          <ShoppingCartPage />
        </Route>
        <Route path="/products/:id">
          <ProductPage />
        </Route>
        <Route path="/products" exact>
          <AllProductsPage />
        </Route>
        <Redirect to="/products" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/auth" exact>
        <AuthPage />
      </Route>
      <Route path="/products/:id">
        <ProductPage />
      </Route>
      <Route path="/products" exact>
        <AllProductsPage />
      </Route>
      <Redirect to="/products" />
    </Switch>
  )
}
