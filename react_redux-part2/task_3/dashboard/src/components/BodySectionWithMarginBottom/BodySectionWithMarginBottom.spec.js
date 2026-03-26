import { render, screen } from '@testing-library/react';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';

test('renders title and children', () => {
  render(
    <BodySectionWithMarginBottom title="Test Title">
      <p>Child content</p>
    </BodySectionWithMarginBottom>
  );

  expect(screen.getByRole('heading', { name: /test title/i })).toBeInTheDocument();
  expect(screen.getByText('Child content')).toBeInTheDocument();
});

test('applies margin bottom styling to the wrapper div', () => {
  const { container } = render(
    <BodySectionWithMarginBottom title="Test Title">
      <p>Child content</p>
    </BodySectionWithMarginBottom>
  );

  expect(container.firstChild.className).toMatch(/bodySectionWithMargin_/);
});
