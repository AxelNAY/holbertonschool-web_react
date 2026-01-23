export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="App-footer border-t-[3px] border-[var(--main-color)] py-2 text-center italic">
      <p>Copyright {year} - Holberton School main dashboard</p>
    </footer>
  );
}
