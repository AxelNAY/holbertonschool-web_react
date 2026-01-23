import React, { Component } from 'react';

export default class Login extends Component {
  constructor(props) {
    super(props);
    const { email = '', password = '' } = props;
    this.state = {
      email,
      password,
      enableSubmit: false
    };
  }

  isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  updateEnableSubmit = (email, password) => {
    const isValid = email.trim() !== '' && 
                    password.trim() !== '' && 
                    this.isValidEmail(email) && 
                    password.length >= 8;
    this.setState({ enableSubmit: isValid });
  };

  handleChangeEmail = (e) => {
    const newEmail = e.target.value;
    this.setState({ email: newEmail }, () => {
      this.updateEnableSubmit(this.state.email, this.state.password);
    });
  };

  handleChangePassword = (e) => {
    const newPassword = e.target.value;
    this.setState({ password: newPassword }, () => {
      this.updateEnableSubmit(this.state.email, this.state.password);
    });
  };

  handleLoginSubmit = (e) => {
    e.preventDefault();
    const { logIn } = this.props;
    const { email, password } = this.state;
    if (logIn) {
      logIn(email, password);
    }
  };

  render() {
    return (
      <section
        className="login-section mx-auto w-full max-w-3xl rounded-md bg-white p-4 shadow border-t-4 border-solid"
        style={{ borderTopColor: 'var(--main-color)' }}
      >
        <p className="mb-4">Login to access the full dashboard</p>

        <form 
          className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3"
          onSubmit={this.handleLoginSubmit}
        >
          <label htmlFor="email" className="sm:mr-1">Email:</label>
          <input
            id="email"
            type="email"
            value={this.state.email}
            onChange={this.handleChangeEmail}
            className="input-email w-full sm:w-auto rounded border border-gray-300 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
          />

          <label htmlFor="password" className="sm:ml-2 sm:mr-1">Password:</label>
          <input
            id="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChangePassword}
            className="input-password w-full sm:w-auto rounded border border-gray-300 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
          />

          <input
            type="submit"
            value="OK"
            disabled={!this.state.enableSubmit}
            className="btn-ok sm:ml-2 rounded bg-gray-900 px-4 py-2 text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </form>
      </section>
    );
  }
}
