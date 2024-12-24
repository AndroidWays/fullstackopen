import { Container, Paper } from '@mui/material';
import NavBar from './NavBar';

const Layout = ({ children }) => {
  return (
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        p: 2
      }}
    >
      <NavBar />
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: 800,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          mt: 2
        }}
      >
        {children}
      </Paper>
    </Container>
  );
};

export default Layout;
