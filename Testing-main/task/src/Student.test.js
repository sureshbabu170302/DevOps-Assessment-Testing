import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Student from './Student';

// Mock the fetchItems function
jest.mock('./Variable', () => ({
  variables: {
    API_URL: 'mocked-api-url/',
  },
}));

describe('Student Component', () => {
  it('renders without error', () => {
    render(<Student />);
    // Add your assertions here
  });

  it('updates filterCity state on input change', () => {
    const { getByPlaceholderText } = render(<Student />);
    const input = getByPlaceholderText(/Enter city to filter/i);
    fireEvent.change(input, { target: { value: 'New York' } });
    // Add your assertions here
  });

  // Add more test cases for other functions and components within Student.js
});
