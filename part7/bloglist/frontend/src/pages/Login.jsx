import { Box, Paper, Typography } from '@mui/material'
import LoginForm from '../components/LoginForm'

const Login = () => {
  return (
    <div className="login">
      <Box align="center" sx={{ mt: 0, pt: 3, height: 360 }} component={Paper}>
        <Typography variant="h4" component="h2" sx={{ pt: 4 }}>
          Log into the application
        </Typography>
        <LoginForm />
      </Box>
    </div>
  )
}

export default Login
