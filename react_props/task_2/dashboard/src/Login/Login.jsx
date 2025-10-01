import './Login.css'
import holbertonLogo from '../assets/holberton-logo.jpg'

function Login() {
  return (
    <div className="Login">
      <p>Login to access the full dashboard</p>
      <label id="email">Email: 
        <input placeholder='email'></input>
      </label>
      <label id="password">Password: 
        <input placeholder='password'></input>
      </label>
      <button>OK</button>
    </div>
  )
}

export default Login
