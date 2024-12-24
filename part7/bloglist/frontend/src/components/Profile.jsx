import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IconButton, Menu, MenuItem, Typography, Divider } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { removeCurrentUser } from '../reducers/loginReducer';

const Profile = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(removeCurrentUser());
    navigate('/');
  };

  return (
    <div>
      <IconButton
        color="inherit"
        onClick={handleMenuOpen}
        aria-controls="profile-menu"
        aria-haspopup="true"
        aria-label="Profile Menu"
      >
        <AccountCircleIcon />
      </IconButton>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            width: 200,
            bgcolor: 'background.paper',
            borderRadius: 1,
            boxShadow: 3,
          },
        }}
      >
        <MenuItem onClick={handleMenuClose}>
          <Typography variant="body2" color="textSecondary">
            Profile
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <Typography variant="body2" color="error">
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Profile;
