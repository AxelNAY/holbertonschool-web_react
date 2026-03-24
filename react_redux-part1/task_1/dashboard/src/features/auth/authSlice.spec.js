import authReducer, { login, logout } from './authSlice';

const initialState = {
  user: {
    email: '',
    password: '',
  },
  isLoggedIn: false,
};

describe('authSlice', () => {
  it('should return the correct initial state by default', () => {
    expect(authReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('should update the state correctly when login action is dispatched', () => {
    const payload = { email: 'test@test.com', password: 'password123' };
    const state = authReducer(undefined, login(payload));

    expect(state.user.email).toBe(payload.email);
    expect(state.user.password).toBe(payload.password);
    expect(state.isLoggedIn).toBe(true);
  });

  it('should reset the state correctly when logout action is dispatched', () => {
    const loggedInState = {
      user: { email: 'test@test.com', password: 'password123' },
      isLoggedIn: true,
    };

    const state = authReducer(loggedInState, logout());

    expect(state.user.email).toBe('');
    expect(state.user.password).toBe('');
    expect(state.isLoggedIn).toBe(false);
  });
});
