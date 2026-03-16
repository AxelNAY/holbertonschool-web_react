import PropTypes from 'prop-types';
import WithLogging from '../../components/HOC/WithLogging';
import useLogin from '../../hooks/useLogin';

function Login({ logIn }) {
  const { email, password, enableSubmit, handleChangeEmail, handleChangePassword } = useLogin();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    logIn(email, password);
  };

  return (
    <div className="App-body p-[10px]">
      <div className="border-t-[3px] border-[var(--main-color)] pt-2">
        <p className="text-sm mb-2">Login to access the full dashboard</p>

        <form className="App-login inline-flex items-center gap-2 flex-wrap" onSubmit={handleLoginSubmit}>
          <label htmlFor="email" className="ml-4 mr-2">Email</label>
          <input id="email" type="email" className="border border-gray-300 px-2 py-1 mr-2 rounded" value={email} onChange={handleChangeEmail} />

          <label htmlFor="password" className="ml-4 mr-2">Password</label>
          <input id="password" type="password" className="border border-gray-300 px-2 py-1 mr-2 rounded" value={password} onChange={handleChangePassword} />

          <input type="submit" value="OK" className="px-3 py-1 border rounded text-xs" disabled={!enableSubmit} />
        </form>
      </div>
    </div>
  );
}

Login.defaultProps = {
  logIn: () => {},
};

Login.propTypes = {
  logIn: PropTypes.func,
};

const LoginWithLogging = WithLogging(Login);
export default LoginWithLogging;
