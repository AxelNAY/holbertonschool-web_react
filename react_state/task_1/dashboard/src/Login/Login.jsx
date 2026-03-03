import { Component } from 'react';
import WithLogging from '../HOC/WithLogging';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false, email: '', password: '', enableSubmit: false };
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.updateEnableSubmit = this.updateEnableSubmit.bind(this);
  }

  handleLoginSubmit(e) {
    e.preventDefault();
    this.setState({ isLoggedIn: true });
  }

  handleChangeEmail(e) {
    this.setState({ email: e.target.value }, this.updateEnableSubmit);
  }

  handleChangePassword(e) {
    this.setState({ password: e.target.value }, this.updateEnableSubmit);
  }

  updateEnableSubmit() {
    const { email, password } = this.state;
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    this.setState({ enableSubmit: validEmail && password.length >= 8 });
  }

  render() {
    return (
      <div className="App-body p-[10px]">
        <div className="border-t-[3px] border-[var(--main-color)] pt-2">
          <p className="text-sm mb-2">Login to access the full dashboard</p>

          <form className="App-login inline-flex items-center gap-2 flex-wrap" onSubmit={this.handleLoginSubmit}>
            <label htmlFor="email" className="ml-4 mr-2">Email</label>
            <input id="email" type="email" className="border border-gray-300 px-2 py-1 mr-2 rounded" value={this.state.email} onChange={this.handleChangeEmail} />

            <label htmlFor="password" className="ml-4 mr-2">Password</label>
            <input id="password" type="password" className="border border-gray-300 px-2 py-1 mr-2 rounded" value={this.state.password} onChange={this.handleChangePassword} />

            <input type="submit" value="OK" className="px-3 py-1 border rounded text-xs" disabled={!this.state.enableSubmit} />
          </form>
        </div>
      </div>
    );
  }
}
const LoginWithLogging = WithLogging(Login);
export default LoginWithLogging;
