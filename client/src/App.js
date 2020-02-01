import React from 'react'
import 'materialize-css'
import {BrowserRouter} from 'react-router-dom'
import {useRoutes} from './routes'
import {Navbar} from './components/Navbar'

function App() {
  const isAuthorised = !!sessionStorage.getItem('eshopToken')
  const routes = useRoutes(isAuthorised)
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        {routes}
      </div>
    </BrowserRouter>
  )
}

export default App
