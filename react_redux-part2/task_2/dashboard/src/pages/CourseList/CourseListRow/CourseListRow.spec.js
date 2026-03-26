import { render, screen, within, fireEvent } from '@testing-library/react';
import CourseListRow from './CourseListRow';

test('renders header with one cell spanning two columns when textSecondCell is null', () => {
  render(
    <table>
      <tbody>
        <CourseListRow isHeader={true} textFirstCell="First" textSecondCell={null} />
      </tbody>
    </table>
  );

  const thElement = screen.getByRole('columnheader');
  expect(thElement).toHaveAttribute('colSpan', '2');
});

test('renders header with two cells when textSecondCell is provided', () => {
  render(
    <table>
      <tbody>
        <CourseListRow isHeader={true} textFirstCell="First" textSecondCell="Second" />
      </tbody>
    </table>
  );

  const thElements = screen.getAllByRole('columnheader');
  expect(thElements).toHaveLength(2);
});

test('renders regular row with three cells (checkbox, name, credit) when isHeader is false', () => {
  render(
    <table>
      <tbody>
        <CourseListRow isHeader={false} textFirstCell="Data1" textSecondCell="Data2" />
      </tbody>
    </table>
  );

  const trElement = screen.getByRole('row');
  const tdElements = within(trElement).getAllByRole('cell');

  expect(trElement).toBeInTheDocument();
  expect(tdElements).toHaveLength(3);
});

test('renders a checkbox in a regular row', () => {
  render(
    <table>
      <tbody>
        <CourseListRow isHeader={false} textFirstCell="Data1" textSecondCell="Data2" isSelected={false} />
      </tbody>
    </table>
  );

  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).toBeInTheDocument();
  expect(checkbox).not.toBeChecked();
});

test('calls changeRow with id and true when checkbox is checked', () => {
  const changeRow = jest.fn();
  render(
    <table>
      <tbody>
        <CourseListRow isHeader={false} textFirstCell="Data1" textSecondCell="Data2" id={1} isSelected={false} changeRow={changeRow} />
      </tbody>
    </table>
  );

  fireEvent.click(screen.getByRole('checkbox'));
  expect(changeRow).toHaveBeenCalledWith(1, true);
});

test('calls changeRow with id and false when checkbox is unchecked', () => {
  const changeRow = jest.fn();
  render(
    <table>
      <tbody>
        <CourseListRow isHeader={false} textFirstCell="Data1" textSecondCell="Data2" id={1} isSelected={true} changeRow={changeRow} />
      </tbody>
    </table>
  );

  fireEvent.click(screen.getByRole('checkbox'));
  expect(changeRow).toHaveBeenCalledWith(1, false);
});
