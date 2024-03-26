import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import { setAuthedUser } from '../actions/authedUser';

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authedUser = useSelector((state) => state.authedUser);
  const users = useSelector((state) => state.users);
  const pages = authedUser
    ? [
        {
          value: 'Home',
          to: '/',
          //   useExact: true
        },
        {
          value: 'Leaderboard',
          to: '/leaderboard',
          //   useExact: true
        },
        {
          value: 'Add Question',
          to: '/add',
          //   useExact: true
        },
      ]
    : [];

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [accountDropdownOptions, setAccountDropdownOptions] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    dispatch(setAuthedUser(null));
    navigate('/login');
  };

  useEffect(() => {
    // const renderLoginLink = () => {
    //   if (!authedUser) {
    //     setLoginLink(
    //       <NavLink to="login" className="nav-item font-weight-bold text-dark">
    //         SIGN IN
    //       </NavLink>
    //     );
    //   } else {
    //     setLoginLink(null);
    //   }
    // };

    // const renderAccountDropdownOptions = () => {
    //   if (authedUser) {
    //     setAccountDropdownOptions({
    //       avatarURL: users[authedUser].avatarURL,
    //       name: users[authedUser].name,
    //       description: users[authedUser].id,
    //       options: [
    //         {
    //           icon: 'help-circle',
    //           value: 'Need help?',
    //           to: 'https://github.com/cangir/udacity-reactnd-would-you-rather#introduction',
    //         },
    //         { icon: 'log-out', value: 'Sign Out', onClick: () => handleLogout() },
    //       ],
    //     });
    //   } else {
    //     setAccountDropdownOptions(false);
    //   }
    // };

    if (authedUser) {
      setAccountDropdownOptions(users[authedUser]);
    }

    // const renderNavBarItems = () => {
    //   if (authedUser) {
    //     setNavBarItems([
    //       {
    //         value: 'Home',
    //         to: '/',
    //         icon: 'home',
    //         LinkComponent: NavLink,
    //         useExact: true,
    //       },
    //       {
    //         value: 'Leaderboard',
    //         to: '/leaderboard',
    //         icon: 'award',
    //         LinkComponent: NavLink,
    //         useExact: true,
    //       },
    //       {
    //         value: 'Add Question',
    //         to: '/add',
    //         icon: 'plus-circle',
    //         LinkComponent: NavLink,
    //         useExact: true,
    //       },
    //     ]);
    //   } else {
    //     setNavBarItems([]);
    //   }
    // };

    // renderLoginLink();
    // renderAccountDropdownOptions();
    // renderNavBarItems();
  }, [authedUser, users]);

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <img
            srcSet={logo}
            src={logo}
            alt={'logo'}
            loading='lazy'
            width={40}
            height={40}
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
          />

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.value} onClick={handleCloseNavMenu}>
                  <Link to={page.to} style={{ textDecoration: 'none' }}>
                    <Typography textAlign='center'>{page.value}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link
                key={page.value}
                to={page.to}
                style={{ textDecoration: 'none' }}
              >
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.value}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar
                      alt='Profile Picture'
                      src={accountDropdownOptions?.avatarURL}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    sx={{ color: '#fff' }}
                    primary={accountDropdownOptions?.name}
                    secondary={accountDropdownOptions?.id}
                  />
                </ListItemButton>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {authedUser ? (
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign='center'>Logout</Typography>
                </MenuItem>
              ) : (
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign='center'>Login</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
