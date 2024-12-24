import { useState, forwardRef, useImperativeHandle } from 'react';
import { Button, Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const Togglable = forwardRef(({ buttonLabel, children }, ref) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(prev => !prev);
  };

  useImperativeHandle(ref, () => ({
    toggleVisibility,
  }));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {!isVisible && (
        <Button
          id="toggle-show-button"
          variant="outlined"
          color="secondary"
          onClick={toggleVisibility}
          sx={{ mb: 2, backgroundColor: '#f0f0f0', '&:hover': { backgroundColor: '#e0e0e0' } }}
        >
          {buttonLabel}
        </Button>
      )}
      {isVisible && (
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          {children}
          <Button
            id="toggle-hide-button"
            variant="contained"
            color="error"
            onClick={toggleVisibility}
            sx={{ mt: 2, borderRadius: '20px', backgroundColor: '#ff4d4d', '&:hover': { backgroundColor: '#cc0000' } }}
          >
            Close
          </Button>
        </Box>
      )}
    </Box>
  );
});

Togglable.displayName = 'Togglable';

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Togglable;
