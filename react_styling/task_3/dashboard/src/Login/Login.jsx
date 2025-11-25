import WithLogging from '../HOC/WithLogging';

function Login() {
  return (
    <div className="p-[10px]" style={{ borderColor: 'var(--main-color)' }}>
      <p>Login to access the full dashboard</p>
      <label className="[16px] mr-[8px]" htmlFor="email">Email:</label>
      <input className="mr-[8px] border border-gray-400 rounded px-1" id="email" type="email" />
      <label className="[16px] mr-[8px]" htmlFor="password">Password:</label>
      <input className="mr-[8px] border border-gray-400 rounded px-1" id="password" type="password" />
      <button className="border border-gray-400 rounded px-2">OK</button>
    </div>
  );
}

export default WithLogging(Login);
