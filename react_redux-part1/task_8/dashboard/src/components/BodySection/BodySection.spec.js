import { render, screen } from '@testing-library/react';
import BodySection from './BodySection';

test('renders a heading with the title prop value', () => {
  render(
    <BodySection title="Test Title">
      <p>Test child</p>
    </BodySection>
  );

  const titleElement = screen.getByRole('heading', { name: /test title/i });
  expect(titleElement).toBeInTheDocument();
  expect(titleElement.tagName).toBe('H2');
});

test('renders children passed to it', () => {
  render(
    <BodySection title="Test Title">
      <p>Child 1</p>
      <p>Child 2</p>
      <p>Child 3</p>
    </BodySection>
  );

  expect(screen.getByText('Child 1')).toBeInTheDocument();
  expect(screen.getByText('Child 2')).toBeInTheDocument();
  expect(screen.getByText('Child 3')).toBeInTheDocument();
});
