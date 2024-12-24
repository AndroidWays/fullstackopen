import { useSelector } from 'react-redux'
import { AppBar, Toolbar, Typography, Box } from '@mui/material'

import Notifications from './Notifications'
import NavLinks from './NavLinks'
import Profile from './Profile'

const NavBar = () => {
  const loggedUser = useSelector((state) => state.login)

  return (
    <>
      <AppBar position="sticky" component="nav" sx={{ height: 70 }}>
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Typography variant="h4">
            Bloglist App
          </Typography>
          {loggedUser && (
            <>
              <Box sx={{ display: 'flex', gap: 2 }}> {/* Flex container to align NavLinks and Profile */}
                <NavLinks />
                <Profile />
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Notifications />
    </>
  )
}

export default NavBar
