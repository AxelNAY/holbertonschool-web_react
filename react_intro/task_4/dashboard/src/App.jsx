import './App.css'
import holbertonLogo from './assets/holberton-logo.jpg'
import { getCurrentYear, getFooterCopy } from './utils.js'
import Notifications from './Notifications.jsx'

function App() {
  return (
    <>
      <div className="root-notifications">
        <Notifications />
      </div>
      <div class="App-header">
        <img src={holbertonLogo} alt="holberton logo" className="App-logo" />
        <h1>School dashboard</h1>
      </div>
      <div class="App-body">
        <p>Login to access the full dashboard</p>
        <label id="email">Email
          <input placeholder='email'>
          </input>
        </label>
        <label id="password">Password
          <input placeholder='password'>
          </input>
        </label>
        <button>OK</button>
      </div>
      <div class="App-footer">
        <p>Copyright { getCurrentYear() } { getFooterCopy(true) }</p>
      </div>
    </>
  )
}

export default App
