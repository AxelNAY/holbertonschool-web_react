import { render, screen } from '@testing-library/react'
import { getCurrentYear, getFooterCopy, getLatestNotification } from './utils.js'

test('Verify that the function getCurrentYear returns the correct year', () => {
  expect(getCurrentYear()).toBe(new Date().getFullYear());
})

test('Verify that getFooterCopy returns the correct string when the argument is true or false', () => {
  expect(getFooterCopy(true)).toBe('Holberton School');

  expect(getFooterCopy(false)).toBe('Holberton School main dashboard');
})

test('Verify the returned string form getLatestNotification', () => {
  expect(getLatestNotification()).toBe('<strong>Urgent requirement</strong> - complete by EOD');
})
