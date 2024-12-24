// tests/BlogForm.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BlogForm from '../src/components/BlogForm';

test('calls addBlog with the right details when a new blog is created', () => {
  const addBlog = jest.fn();

  render(<BlogForm addBlog={addBlog} />);

  // Simulate user input
  fireEvent.change(screen.getByLabelText('Title:'), { target: { value: 'Test Blog' } });
  fireEvent.change(screen.getByLabelText('Author:'), { target: { value: 'Test Author' } });
  fireEvent.change(screen.getByLabelText('URL:'), { target: { value: 'https://example.com' } });

  // Submit the form
  fireEvent.click(screen.getByText('Create'));

  // Check that addBlog was called with the right details
  expect(addBlog).toHaveBeenCalledWith({
    title: 'Test Blog',
    author: 'Test Author',
    url: 'https://example.com'
  });
});
