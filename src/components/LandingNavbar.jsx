import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Collapse,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';

// Landing page Navbar component with responsive hamburger menu
const LandingNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Navigation items with submenus
  const navItems = [
    {
      label: 'Home',
      path: '/',
      submenu: [
        { label: 'Overview', path: '/' },
        { label: 'Features', path: '/#about' },
        { label: 'Get Started', path: '/register' },
      ],
    },
    {
      label: 'About',
      path: '#about',
      submenu: [
        { label: 'Our Mission', path: '#about' },
        { label: 'Our Team', path: '#about' },
        { label: 'Why Choose Us', path: '#about' },
        { label: 'Partners', path: '#about' },
      ],
    },
    {
      label: 'How It Works',
      path: '#how-it-works',
      submenu: [
        { label: 'Step 1: Register', path: '/register' },
        { label: 'Step 2: Upload', path: '/upload' },
        { label: 'Step 3: Verify', path: '/dashboard' },
        { label: 'FAQ', path: '#how-it-works' },
      ],
    },
    {
      label: 'Contact',
      path: '#contact',
      submenu: [
        { label: 'Support', path: '#contact' },
        { label: 'Help Center', path: '#contact' },
        { label: 'Contact Us', path: '#contact' },
        { label: 'Feedback', path: '#contact' },
      ],
    },
  ];

  // State for dropdown menus
  const [anchorEls, setAnchorEls] = useState({});
  const [openSubmenus, setOpenSubmenus] = useState({});

  const handleMenuOpen = (event, itemLabel) => {
    setAnchorEls({ ...anchorEls, [itemLabel]: event.currentTarget });
  };

  const handleMenuClose = (itemLabel) => {
    setAnchorEls({ ...anchorEls, [itemLabel]: null });
  };

  const handleSubmenuClick = (path, itemLabel) => {
    handleNavClick(path);
    handleMenuClose(itemLabel);
  };

  const handleMobileSubmenuToggle = (itemLabel) => {
    setOpenSubmenus({ ...openSubmenus, [itemLabel]: !openSubmenus[itemLabel] });
  };

  const handleNavClick = (path) => {
    if (path.startsWith('#')) {
      // Scroll to section
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
    setMobileOpen(false);
  };

  const drawer = (
    <Box sx={{ width: 250 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, alignItems: 'center' }}>
        <Logo />
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navItems.map((item) => (
          <React.Fragment key={item.label}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  if (item.submenu && item.submenu.length > 0) {
                    handleMobileSubmenuToggle(item.label);
                  } else {
                    handleNavClick(item.path);
                  }
                }}
              >
                <ListItemText primary={item.label} />
                {item.submenu && item.submenu.length > 0 && (
                  openSubmenus[item.label] ? <ExpandLess /> : <ExpandMore />
                )}
              </ListItemButton>
            </ListItem>
            {item.submenu && item.submenu.length > 0 && (
              <Collapse in={openSubmenus[item.label]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.submenu.map((subItem) => (
                    <ListItem key={subItem.label} disablePadding>
                      <ListItemButton
                        sx={{ pl: 4 }}
                        onClick={() => handleSubmenuClick(subItem.path, item.label)}
                      >
                        <ListItemText primary={subItem.label} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
        {user ? (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={() => { navigate('/dashboard'); setMobileOpen(false); }}>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={() => { navigate('/login'); setMobileOpen(false); }}>
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => { navigate('/register'); setMobileOpen(false); }}>
                <ListItemText primary="Register" />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" elevation={0} sx={{ backgroundColor: 'white', color: 'text.primary' }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
            <Logo onClick={() => navigate('/')} />

            {isMobile ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                {navItems.map((item) => (
                  <Box key={item.label}>
                    <Button
                      color="inherit"
                      onClick={(e) => {
                        if (item.submenu && item.submenu.length > 0) {
                          handleMenuOpen(e, item.label);
                        } else {
                          handleNavClick(item.path);
                        }
                      }}
                      sx={{ textTransform: 'none', fontWeight: 500 }}
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
                ))}
                {user ? (
                  <>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => navigate('/dashboard')}
                      sx={{ textTransform: 'none' }}
                    >
                      Dashboard
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleLogout}
                      sx={{ textTransform: 'none' }}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => navigate('/login')}
                      sx={{ textTransform: 'none' }}
                    >
                      Login
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => navigate('/register')}
                      sx={{ textTransform: 'none' }}
                    >
                      Register
                    </Button>
                  </>
                )}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default LandingNavbar;

