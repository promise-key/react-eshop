import React, {useState} from 'react'
import axios from 'axios'

export const AuthPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  })

  const inputChangeHandler = event => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  // connect to server and db
  const registrationHandler = async () => {
    try {
      const proxy = 'http://localhost:5000'
      const response = await axios.post(proxy+'/api/auth/register', {...form})
      if (window.M && response.data.message) {
        window.M.toast({html: response.data.message})
      }
      // console.log('registrationHandler response \n', response.data.message, response)
    } catch (e) {
      if (window.M && e.response.data.message) {
        window.M.toast({html: e.response.data.message})
      }
      // console.log('registrationHandler e \n', e.response, e);
    }
  }

  const loginHandler = async () => {
    try {
      const proxy = 'http://localhost:5000'
      const response = await axios.post(proxy+'/api/auth/login', {...form})
      if (window.M && response.data.message && response.data.token) {
        sessionStorage.setItem('eshopToken', response.data.token)
        window.M.toast({html: response.data.message})
        const history = window.history
        setTimeout( () => {
          history.go('/')
        }, 500)
      }
      // console.log('Token', response.data.token)
      // console.log('loginHandler response \n', response.data.message, response)
    } catch (e) {
      if (window.M && e.response && e.response.data.message) {
        window.M.toast({html: e.response.data.message})
      }
      // console.log('loginHandler e \n', e.response, e);
    }
  }

  return (
    <div className="row">
      <div className="col s12">
        <div className="card teal darken-2">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
            <div className="row">
              <div className="input-field col s12">
                <input
                  placeholder="Your full name"
                  id="name"
                  type="text"
                  className="validate authInput"
                  name="name"
                  onChange={inputChangeHandler}
                  autoFocus />
                <label htmlFor="name">Name</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  placeholder="Enter your email"
                  id="email"
                  type="email"
                  className="validate authInput"
                  required
                  name="email"
                  onChange={inputChangeHandler} />
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  placeholder="Enter your password"
                  id="password"
                  type="password"
                  className="validate authInput"
                  required
                  name="password"
                  onChange={inputChangeHandler} />
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action authButtons">
            <button
              className="btn teal accent-3 black-text"
              onClick = {loginHandler}>
              Login</button>
            <button
              className="btn yellow accent-4 black-text"
              onClick = {registrationHandler}>
              Register</button>
          </div>
        </div>
      </div>
    </div>
  )
}
