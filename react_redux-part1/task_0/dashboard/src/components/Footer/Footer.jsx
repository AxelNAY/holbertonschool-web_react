export default function Footer({ user }) {
  const year = new Date().getFullYear();
  return (
    <footer className="App-footer border-t-[3px] border-[var(--main-color)] py-2 text-center italic">
      <p>Copyright {year} - Holberton School main dashboard</p>
      {user && user.isLoggedIn && (
        <p><a href="mailto:contact@holbertonschool.com">Contact us</a></p>
      )}
    </footer>
  );
}
