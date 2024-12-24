
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../index.css'; // This path is correct if index.css is in the src directory

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  const handleUpdate = () => {
    // Example logic to use updateBlog
    updateBlog(blog.id, { ...blog, likes: blog.likes + 1 });
  };

  return (
    <div className="blog">
      <div className="blog-header">
        <span className="blog-title">{blog.title}</span>
        <span className="blog-author">{blog.author}</span>
        <button onClick={() => setDetailsVisible(!detailsVisible)} className="toggle-details-button">
          {detailsVisible ? 'Hide' : 'View'}
        </button>
      </div>
      {detailsVisible && (
        <div className="blog-details">
          <a href={blog.url} className="blog-url">{blog.url}</a>
          <p className="blog-likes">{blog.likes} likes</p>
          <button onClick={handleUpdate} className="like-button">Like</button>
          {user && user.id === blog.user.id && (
            <button onClick={() => deleteBlog(blog.id)} className="remove-button">Remove</button>
          )}
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string,
    likes: PropTypes.number,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
};

export default Blog;
