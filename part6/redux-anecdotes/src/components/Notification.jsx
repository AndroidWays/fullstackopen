// src/components/Notification.jsx
import React, { useEffect } from 'react';
import { useNotification } from '../contexts/NotificationContext';

const Notification = () => {
  const { state, dispatch } = useNotification();

  useEffect(() => {
    if (state.timeout) {
      const timer = setTimeout(() => {
        dispatch({ type: 'HIDE_NOTIFICATION' });
      }, state.timeout);
      return () => clearTimeout(timer);
    }
  }, [state.message, state.timeout, dispatch]);

  if (!state.message) return null;

  return (
    <div style={{ padding: '10px', backgroundColor: '#f8d7da', color: '#721c24', borderRadius: '5px', border: '1px solid #f5c6cb', marginBottom: '10px' }}>
      {state.message}
    </div>
  );
};

export default Notification;
