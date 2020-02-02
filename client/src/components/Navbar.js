import React from 'react'
import {NavLink, useHistory} from 'react-router-dom'

export const Navbar = () => {
  const history = useHistory()
  let token = null
  if (sessionStorage.getItem('eshopToken')) {
    token = sessionStorage.getItem('eshopToken')
  }

  const logoutHandler = event => {
    event.preventDefault()
    sessionStorage.removeItem('eshopToken')
    history.push('/')
  }

  document.addEventListener('DOMContentLoaded', function() {
    const elems = document.querySelectorAll('.sidenav')
    // eslint-disable-next-line
    const instances = window.M.Sidenav.init(elems, 'left')
  })

  return (
    <>
      <nav>
       <div className="nav-wrapper lime darken-2">
         <a href="/" className="brand-logo">eShop</a>
          <a href="#menu" data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
            <li><NavLink to='/cart'>Shopping Cart</NavLink></li>
            <li><NavLink to='/products'>Products</NavLink></li>
            { token
              ? <li><a href='/' onClick={logoutHandler}>Logout</a></li>
              : <li><a href='/auth'>Login</a></li>
            }
          </ul>
        </div>
      </nav>

      <ul className="sidenav" id="mobile-demo">
        <li><NavLink to='/cart'>Shopping Cart</NavLink></li>
        <li><NavLink to='/products'>Products</NavLink></li>
        { token
          ? <li><a href='/' onClick={logoutHandler}>Logout</a></li>
          : <li><a href='/auth'>Login</a></li>
      }
    </ul>
    </>
  )
}
