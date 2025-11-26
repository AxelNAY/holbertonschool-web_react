export default function Login() {
  return (
    <section
      className="login-section mx-auto w-full max-w-3xl rounded-md bg-white p-4 shadow border-t-4 border-solid"
      style={{ borderTopColor: 'var(--main-color)' }}
    >
      <p className="mb-4">Login to access the full dashboard</p>

      <form className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
        <label htmlFor="email" className="sm:mr-1">Email:</label>
        <input
          id="email"
          type="email"
          className="input-email w-full sm:w-auto rounded border border-gray-300 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
        />

        <label htmlFor="password" className="sm:ml-2 sm:mr-1">Password:</label>
        <input
          id="password"
          type="password"
          className="input-password w-full sm:w-auto rounded border border-gray-300 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
        />

        <button
          type="submit"
          className="btn-ok sm:ml-2 rounded bg-gray-900 px-4 py-2 text-white hover:opacity-90"
        >
          OK
        </button>
      </form>
    </section>
  );
}
