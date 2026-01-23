import { useState } from 'react';

export default function Login({ logIn, email = '', password = '' }) {
  const [formData, setFormData] = useState({ email, password });
  const [enableSubmit, setEnableSubmit] = useState(false);

  const isValidEmail = (emailValue) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailValue);
  };

  const updateEnableSubmit = (emailValue, passwordValue) => {
    const isValid =
      emailValue.trim() !== '' &&
      passwordValue.trim() !== '' &&
      isValidEmail(emailValue) &&
      passwordValue.length >= 8;

    setEnableSubmit(isValid);
  };

  const handleChangeEmail = (e) => {
    const { value } = e.target;

    setFormData((prev) => {
      const updated = { ...prev, email: value };
      updateEnableSubmit(updated.email, updated.password);
      return updated;
    });
  };

  const handleChangePassword = (e) => {
    const { value } = e.target;

    setFormData((prev) => {
      const updated = { ...prev, password: value };
      updateEnableSubmit(updated.email, updated.password);
      return updated;
    });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (logIn) {
      logIn(formData.email, formData.password);
    }
  };

  return (
    <section
      className="login-section mx-auto w-full max-w-3xl rounded-md bg-white p-4 shadow border-t-4 border-solid"
      style={{ borderTopColor: 'var(--main-color)' }}
    >
      <p className="mb-4">Login to access the full dashboard</p>

      <form
        className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3"
        onSubmit={handleLoginSubmit}
      >
        <label htmlFor="email" className="sm:mr-1">Email:</label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChangeEmail}
          className="input-email w-full sm:w-auto rounded border border-gray-300 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
        />

        <label htmlFor="password" className="sm:ml-2 sm:mr-1">Password:</label>
        <input
          id="password"
          type="password"
          value={formData.password}
          onChange={handleChangePassword}
          className="input-password w-full sm:w-auto rounded border border-gray-300 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
        />

        <input
          type="submit"
          value="OK"
          disabled={!enableSubmit}
          className="btn-ok sm:ml-2 rounded bg-gray-900 px-4 py-2 text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </form>
    </section>
  );
}
