import axios from 'axios'
import { useState } from 'react'
import { LoggedIn } from './components/LoggedIn'
import { AllUsers } from './components/AllUsers'
import { useEffect } from 'react'
import './App.css'

function App() {

  const [usernameRegister, setUsernameRegister] = useState('')
  const [passwordRegister, setPasswordRegister] = useState('')
  // const [loginStatus, setLoginStatus] = useState('Currently logged out.')
  const [loginStatus, setLoginStatus] = useState('empty')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const register = () => {
    axios.post('http://localhost:3001/register', { username: usernameRegister, password: passwordRegister }).then((response) => {
      console.log(response)
    })
    window.location.reload()
  }

  const login = () => {
    axios.post('http://localhost:3001/login', {
      username: username,
      password: password
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message)
      }
      else {
        setLoginStatus(response.data[0].username)
      }
      // console.log(response.data)
    })
  }

  return (
    <>
      <div className='input-registeredUsers'>
        <div className='all-registered-users'>
          <div className='title-allUsers'>
            <h1>All registered users</h1>
            <p>Here we don`t care about your privacy.</p>
            <div className='users-row'>
              <AllUsers />
            </div>

          </div>
        </div>
        <div className='register-login'>
          <h1>Register</h1>
          <div className='inputs'>
            <input type='text' placeholder='name' onChange={(event) => {
              setUsernameRegister(event.target.value)
            }} />
            <input type='password' placeholder='password' onChange={(event) => {
              setPasswordRegister(event.target.value)
            }} />
            <button onClick={register}>Register</button>
          </div>

          <h1>Login</h1>
          <div className='inputs'>
            <input type='text' placeholder='name' onChange={(event) => {
              setUsername(event.target.value)
            }} />
            <input type='password' placeholder='password' onChange={(event) => {
              setPassword(event.target.value)
            }} />
            <button onClick={login} >Login</button>
          </div>

          {/* <LoggedIn {loginStatus === '' ? } /> */}
          {/* {loginStatus === 'Currently logged out.' ? <LoggedIn name={loginStatus} /> : <p>{loginStatus} has logged in</p>} */}
        </div>
        <LoggedIn name={loginStatus} />
      </div>
    </>
  )
}

export default App
