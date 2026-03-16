import { useState, useCallback } from 'react';

export default function useLogin(initialEmail = '', initialPassword = '') {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(initialPassword);
  const [enableSubmit, setEnableSubmit] = useState(false);

  const updateEnableSubmit = useCallback((newEmail, newPassword) => {
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail);
    setEnableSubmit(validEmail && newPassword.length >= 8);
  }, []);

  const handleChangeEmail = useCallback(
    (e) => {
      const newEmail = e.target.value;
      setEmail(newEmail);
      updateEnableSubmit(newEmail, password);
    },
    [password, updateEnableSubmit]
  );

  const handleChangePassword = useCallback(
    (e) => {
      const newPassword = e.target.value;
      setPassword(newPassword);
      updateEnableSubmit(email, newPassword);
    },
    [email, updateEnableSubmit]
  );

  return { email, password, enableSubmit, handleChangeEmail, handleChangePassword };
}
