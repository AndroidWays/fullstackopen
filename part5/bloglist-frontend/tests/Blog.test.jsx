import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Blog from '../src/components/Blog';

test('renders blog title and author by default, and shows URL and likes when details are toggled', () => {
  const blog = {
    id: '1',
    title: 'Test Blog',
    author: 'Test Author',
    url: 'https://example.com',
    likes: 0,
    user: { id: '1' }
  };

  const updateBlog = jest.fn();
  const deleteBlog = jest.fn();
  const user = { id: '1' };

  render(<Blog blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user} />);

  // Check that title and author are visible by default
  expect(screen.getByText('Test Blog')).toBeInTheDocument();
  expect(screen.getByText('Test Author')).toBeInTheDocument();

  // Click the view button to show details
  fireEvent.click(screen.getByText('View'));

  // Check that URL and likes are visible after clicking view
  expect(screen.getByText('https://example.com')).toBeInTheDocument();
  expect(screen.getByText('0 likes')).toBeInTheDocument();
});

test('calls updateBlog twice when the like button is clicked twice', () => {
  const blog = {
    id: '1',
    title: 'Test Blog',
    author: 'Test Author',
    url: 'https://example.com',
    likes: 0,
    user: { id: '1' }
  };

  const updateBlog = jest.fn();
  const deleteBlog = jest.fn();
  const user = { id: '1' };

  render(<Blog blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user} />);

  // Click the view button to show details
  fireEvent.click(screen.getByText('View'));

  // Click the like button twice
  fireEvent.click(screen.getByText('Like'));
  fireEvent.click(screen.getByText('Like'));

  // Check that updateBlog was called twice
  expect(updateBlog).toHaveBeenCalledTimes(2);
});
