import { useContext } from 'react';
import AppContext from '../Context/context.js';

export default function Footer() {
  const { user } = useContext(AppContext);
  const year = new Date().getFullYear();

  return (
    <footer className="App-footer border-t-[3px] border-[var(--main-color)] py-2 text-center italic">
      <p>Copyright {year} - Holberton School main dashboard</p>
      {user.isLoggedIn && (
        <p>
          <a href="#" className="text-blue-600 underline">Contact us</a>
        </p>
      )}
    </footer>
  );
}
