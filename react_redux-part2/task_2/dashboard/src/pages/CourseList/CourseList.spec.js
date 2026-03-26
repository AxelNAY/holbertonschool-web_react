import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import CourseList from './CourseList';
import mockAxios from 'jest-mock-axios';
import rootReducer from '../../app/rootReducer';
import { fetchCourses, selectCourse, unSelectCourse } from '../../features/courses/coursesSlice';
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

test('selectCourse sets isSelected to true for the given course id', () => {
  const store = createStore({
    courses: {
      courses: [
        { id: 1, name: 'ES6', credit: 60, isSelected: false },
      ]
    }
  });

  store.dispatch(selectCourse(1));
  const course = store.getState().courses.courses.find((c) => c.id === 1);
  expect(course.isSelected).toBe(true);
});

test('unSelectCourse sets isSelected to false for the given course id', () => {
  const store = createStore({
    courses: {
      courses: [
        { id: 1, name: 'ES6', credit: 60, isSelected: true },
      ]
    }
  });

  store.dispatch(unSelectCourse(1));
  const course = store.getState().courses.courses.find((c) => c.id === 1);
  expect(course.isSelected).toBe(false);
});

test('checking a checkbox dispatches selectCourse and updates the store', async () => {
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
  });

  const checkboxes = screen.getAllByRole('checkbox');
  fireEvent.click(checkboxes[0]);

  const course = store.getState().courses.courses.find((c) => c.id === 1);
  expect(course.isSelected).toBe(true);
});
