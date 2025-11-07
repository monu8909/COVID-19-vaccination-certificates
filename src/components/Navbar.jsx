import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Container,
  Menu,
  MenuItem,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';

// Navbar component for navigation
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [anchorEls, setAnchorEls] = useState({});

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Menu items with submenus
  const menuItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      submenu: [
        { label: 'My Dashboard', path: '/dashboard' },
        { label: 'My Certificates', path: '/dashboard' },
        { label: 'Profile Settings', path: '/dashboard' },
        { label: 'Account Info', path: '/dashboard' },
      ],
    },
    {
      label: 'Upload Certificate',
      path: '/upload',
      submenu: [
        { label: 'Upload New', path: '/upload' },
        { label: 'Upload History', path: '/dashboard' },
        { label: 'File Guidelines', path: '/upload' },
        { label: 'Help', path: '/upload' },
      ],
    },
    {
      label: 'Admin Dashboard',
      path: '/admin',
      submenu: [
        { label: 'All Certificates', path: '/admin' },
        { label: 'Pending Reviews', path: '/admin' },
        { label: 'Statistics', path: '/admin' },
        { label: 'User Management', path: '/admin' },
      ],
      adminOnly: true,
    },
  ];

  const handleMenuOpen = (event, itemLabel) => {
    setAnchorEls({ ...anchorEls, [itemLabel]: event.currentTarget });
  };

  const handleMenuClose = (itemLabel) => {
    setAnchorEls({ ...anchorEls, [itemLabel]: null });
  };

  const handleSubmenuClick = (path, itemLabel) => {
    navigate(path);
    handleMenuClose(itemLabel);
  };

  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Logo onClick={() => navigate('/')} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {user && (
              <>
                {menuItems.map((item) => {
                  // Skip admin items if user is not admin
                  if (item.adminOnly && user.role !== 'admin') {
                    return null;
                  }
                  // Skip if already on this page
                  if (location.pathname === item.path) {
                    return null;
                  }

                  return (
                    <Box key={item.label}>
                      <Button
                        color="inherit"
                        onClick={(e) => {
                          if (item.submenu && item.submenu.length > 0) {
                            handleMenuOpen(e, item.label);
                          } else {
                            navigate(item.path);
                          }
                        }}
                        sx={{ textTransform: 'none' }}
                      >
                        {item.label}
                      </Button>
                      {item.submenu && item.submenu.length > 0 && (
                        <Menu
                          anchorEl={anchorEls[item.label]}
                          open={Boolean(anchorEls[item.label])}
                          onClose={() => handleMenuClose(item.label)}
                          MenuListProps={{
                            'aria-labelledby': `menu-button-${item.label}`,
                          }}
                          PaperProps={{
                            sx: {
                              mt: 1.5,
                              minWidth: 200,
                              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                            },
                          }}
                        >
                          {item.submenu.map((subItem) => (
                            <MenuItem
                              key={subItem.label}
                              onClick={() => handleSubmenuClick(subItem.path, item.label)}
                              sx={{
                                py: 1,
                                px: 2,
                                '&:hover': {
                                  backgroundColor: 'primary.main',
                                  color: 'white',
                                },
                              }}
                            >
                              {subItem.label}
                            </MenuItem>
                          ))}
                        </Menu>
                      )}
                    </Box>
                  );
                })}
                <Button color="inherit" onClick={handleLogout} sx={{ textTransform: 'none' }}>
                  Logout
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;

