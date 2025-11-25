import {
  getCurrentYear,
  getFooterCopy,
} from '../utils/utils.js';

export default function Footer() {
  return (
    <footer className="border-t-[3px] py-[10px] text-center italic"
      style={{ borderColor: 'var(--main-color)' }}
    >
      <p>Copyright {getCurrentYear()} - {getFooterCopy(false)}</p>
    </footer>
  );
}
