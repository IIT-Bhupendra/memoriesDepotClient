import * as React from 'react';
import { Menu, Avatar, Box, MenuItem, ListItemIcon, IconButton, Tooltip } from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import useStyles from "./style";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import MemoForm from '../MemoForm/MemoForm';
import { LOGOUT } from '../../constants/actionTypes';
import { useNavigate } from 'react-router-dom';

export default function Submenu({user, setUser}) {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    dispatch({ type: LOGOUT });
    history("/");
    setUser(null);
  };

  return (
    <React.Fragment>
      <Box className={classes.menu}>
        <MemoForm btnText={'create'} postId={null}/>
        {/* <Typography>Profile</Typography> */}
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            // sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar sx={{ width: 32, height: 32 }}>{user?.result.name.charAt(0)}</Avatar> {user?.result.name}
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}