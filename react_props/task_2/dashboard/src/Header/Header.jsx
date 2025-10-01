import './Header.css'
import holbertonLogo from '../assets/holberton-logo.jpg'

function Header() {
  return (
    <div className="Header">
      <img src={holbertonLogo} alt="holberton logo" className="Logo" />
      <h1>School dashboard</h1>
    </div>
  )
}

export default Header
