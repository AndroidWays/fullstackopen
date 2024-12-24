import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../reducers/loginReducer';
import { Button, TextField, Box, Typography } from '@mui/material';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const dispatch = useDispatch();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    dispatch(setCurrentUser(credentials));
    setCredentials({ username: '', password: '' });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 400,
        margin: 'auto',
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: '#fff'
      }}
    >
      <Typography variant="h4" component="h2" sx={{ mb: 2 }}>

      </Typography>
      <form onSubmit={handleLoginSubmit} style={{ width: '100%' }}>
        <TextField
          id="username"
          label="Username"
          type="text"
          value={credentials.username}
          name="username"
          fullWidth
          margin="normal"
          onChange={handleInputChange}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          value={credentials.password}
          name="password"
          fullWidth
          margin="normal"
          onChange={handleInputChange}
        />
        <Button
          id="login-button"
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;
