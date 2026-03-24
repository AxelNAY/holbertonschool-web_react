import mockAxios from "jest-mock-axios";
import coursesReducer, { fetchCourses } from "../courses/coursesSlice";
import { logout } from "../auth/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../auth/authSlice";

describe("coursesSlice", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  const initialState = {
    courses: [],
  };

  it("should return the correct initial state by default", () => {
    expect(coursesReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should fetch courses data correctly", async () => {
    const store = configureStore({
      reducer: { courses: coursesReducer },
    });

    const mockData = {
      courses: [
        { id: 1, name: "ES6", credit: 60 },
        { id: 2, name: "Webpack", credit: 20 },
        { id: 3, name: "React", credit: 40 },
      ],
    };

    const thunkPromise = store.dispatch(fetchCourses());
    mockAxios.mockResponse({ data: mockData });
    await thunkPromise;

    const state = store.getState().courses;
    expect(state.courses).toHaveLength(3);
    expect(state.courses[0].name).toBe("ES6");
  });

  it("should reset courses to empty when logout action is dispatched", () => {
    const stateWithCourses = {
      courses: [
        { id: 1, name: "ES6", credit: 60 },
        { id: 2, name: "Webpack", credit: 20 },
      ],
    };

    const state = coursesReducer(stateWithCourses, logout());
    expect(state.courses).toEqual([]);
  });
});
