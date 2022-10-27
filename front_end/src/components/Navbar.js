import * as React from 'react';
import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItemText from '@mui/material/ListItemText';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
// import Switch from '@mui/material/Switch';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
//import Link from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export default function Navbar(props) {
  // const [auth, setAuth] = React.useState(true);
  const [state, setState] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  let navigate = useNavigate();
  // const handleChange = (event) => {
  //   setAuth(event.target.checked);
  // };
  
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
      <AppBar position="static" sx={{ background: "#6fbf73" }}>
        <Toolbar>
        {(
            <div>
          <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="big-menu-appbar"
                aria-haspopup="true"
                onClick={toggleDrawer('left', true)}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                  anchor={'left'}
                  open={state['left']}
                  onClose={toggleDrawer('left', false)}
                  >
                  <Box
                    role="presentation"
                    onClick={toggleDrawer('left', false)}
                    onKeyDown={toggleDrawer('left', false)}
                    >
                    <List>
                      {Object.keys(props.sidemenu).map((k) => (
                        <ListItem key={k} disablePadding>
                          <ListItemButton>
                            <ListItemText primary={k} onClick={() => navigate(props.sidemenu[k])}/>
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
              </Drawer>
            </div>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {props.title}
          </Typography>
          {(
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
  );
}
