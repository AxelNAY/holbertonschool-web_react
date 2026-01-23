import { Component } from 'react';
import holbertonLogo from '../assets/holberton-logo.jpg';
import AppContext from '../Context/context.js';

class Header extends Component {
  static contextType = AppContext;

  render() {
    const { user, logOut } = this.context;

    return (
      <>
        <header className="App-header flex items-center p-[10px]">
          <img
            className="App-logo h-[200px] mr-5"
            src={holbertonLogo}
            alt="Holberton logo"
          />
          <h1 className="text-[var(--main-color)] text-4xl font-bold">
            School Dashboard
          </h1>
        </header>
        {user.isLoggedIn && (
          <section id="logoutSection" className="px-4 py-2">
            Welcome {user.email} (
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                logOut();
              }}
              className="text-blue-600 underline cursor-pointer"
            >
              logout
            </a>
            )
          </section>
        )}
      </>
    );
  }
}

export default Header;
