import React, { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import '../index.css'; // Adjust the path if necessary

const Togglable = forwardRef(({ buttonLabel, children }, ref) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => ({
    toggleVisibility
  }));

  return (
    <div>
      <button onClick={toggleVisibility}>{buttonLabel}</button>
      {visible && (
        <div>
          {children}
        </div>
      )}
    </div>
  );
});

// Adding displayName for better debugging
Togglable.displayName = 'Togglable';

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Togglable;
