import './Header.css';
import holbertonLogo from '../assets/holberton-logo.jpg';

export default function Header() {
  return (
    <header className="App-header">
      <img
        className="App-logo"
        src={holbertonLogo}
        alt="Holberton logo"
      />
      <h1>School dashboard</h1>
    </header>
  );
}
