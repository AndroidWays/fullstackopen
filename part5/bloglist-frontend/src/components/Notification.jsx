
// src/components/Notification.jsx
import React from 'react';
import PropTypes from 'prop-types';
import '../index.css'; // Adjust the path if necessary

const Notification = ({ message = null, type = 'success' }) => {
  if (!message) return null;

  // Ensure `type` is either 'success', 'error', or an empty string
  const validType = ['success', 'error'].includes(type) ? type : '';

  return (
    <div className={`notification ${validType}`}>
      {message}
    </div>
  );
};

// Define prop types for the Notification component
Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(['success', 'error']),
};

export default Notification;
