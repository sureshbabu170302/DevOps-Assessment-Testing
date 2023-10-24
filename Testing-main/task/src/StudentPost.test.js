import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import StudentPost from './StudentPost';

describe('StudentPost Component', () => {
  it('updates state on input change', () => {
    const { getByLabelText } = render(<StudentPost />);
    const nameInput = getByLabelText('Name');
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });

    // Add assertions to check the updated state
    expect(nameInput.value).toBe('John Doe');
  });

  it('submits form data', () => {
    const { getByLabelText, getByText } = render(<StudentPost />);
    const nameInput = getByLabelText('Name');
    const sectionInput = getByLabelText('Section');
    const ageInput = getByLabelText('Age');
    const cityInput = getByLabelText('City');
    const emailInput = getByLabelText('Email');
    const fileInput = getByLabelText('Image');
    const submitButton = getByText('Create');

    // Simulate user input
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(sectionInput, { target: { value: 'A' } });
    fireEvent.change(ageInput, { target: { value: '20' } });
    fireEvent.change(cityInput, { target: { value: 'New York' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(fileInput, { target: { files: [new File([], 'test.png')] } });

    // Simulate form submission
    fireEvent.click(submitButton);

    // Add assertions to check the submitted form data
    // You can check if the data was sent to the server or perform any other necessary assertions
  });
});
