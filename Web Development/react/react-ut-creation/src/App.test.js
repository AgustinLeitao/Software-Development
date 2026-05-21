import { render, screen } from '@testing-library/react';
import App from './App';
import ReactTestUtils from 'react-dom';

test('renders learn react link', () => {
  const { container } = render((<App />));
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

describe('desc', () => {
  describe('sum', () => {
    it('2 + 2 equals 4', () => {

    })

  })
  describe('substract', () => {
    beforeEach(() => {
      const container = document.createElement('div');
      document.body.appendChild(container);
      ReactTestUtils.act(() => {

      })
    })

    it('', () => {
      expect('asd').t
    })
  })
});