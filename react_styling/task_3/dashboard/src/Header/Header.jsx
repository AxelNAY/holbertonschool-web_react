import holbertonLogo from '../assets/holberton-logo.jpg';

export default function Header() {
  return (
    <header
      className="flex items-center gap-[16px] border-b-[3px] border-[#e0354b] py-[20px]"
    >
      <img
        className="h-[200px]"
        src={holbertonLogo}
        alt="Holberton logo"
      />
      <h1 style={{ borderColor: 'var(--main-color)' }}>School dashboard</h1>
    </header>
  );
}
