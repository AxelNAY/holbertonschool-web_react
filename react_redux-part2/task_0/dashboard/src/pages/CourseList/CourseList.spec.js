import { render, screen, waitFor } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import CourseList from './CourseList';
import mockAxios from 'jest-mock-axios';
import rootReducer from '../../app/rootReducer';
import { fetchCourses } from '../../features/courses/coursesSlice';
import { logout } from '../../features/auth/authSlice';

afterEach(() => {
  mockAxios.reset();
});

const mockCoursesResponse = {
  data: {
    courses: [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 }
    ]
  }
};

const createStore = (preloadedState = {}) =>
  configureStore({ reducer: rootReducer, preloadedState });

test('courses list is displayed after fetchCourses API call', async () => {
  const store = createStore();
  render(
    <Provider store={store}>
      <CourseList />
    </Provider>
  );

  store.dispatch(fetchCourses());
  mockAxios.mockResponse(mockCoursesResponse);

  await waitFor(() => {
    expect(screen.getByText('ES6')).toBeInTheDocument();
    expect(screen.getByText('Webpack')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
  });
});

test('courses array is reset after logout action', () => {
  const store = createStore({
    courses: { courses: mockCoursesResponse.data.courses }
  });
  store.dispatch(logout());

  render(
    <Provider store={store}>
      <CourseList />
    </Provider>
  );

  expect(screen.queryByText('ES6')).not.toBeInTheDocument();
  expect(screen.getByText(/no course available yet/i)).toBeInTheDocument();
});
