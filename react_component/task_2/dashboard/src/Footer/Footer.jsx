import './Footer.css';
import {
  getCurrentYear,
  getFooterCopy,
} from '../utils/utils.js';

export default function Footer() {
  // const year = new Date().getFullYear();
  return (
    <footer className="App-footer">
      {/* <p>Copyright {year} - Holberton School</p> */}
      <p>Copyright {getCurrentYear()} - {getFooterCopy(false)}</p>
    </footer>
  );
}
