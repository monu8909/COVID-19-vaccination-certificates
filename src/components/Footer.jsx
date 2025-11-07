import React from 'react';
import { Box, Container, Typography, Link, IconButton, Stack } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

// Footer component for landing page
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        py: 4,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 3,
          }}
        >
          {/* Copyright */}
          <Typography variant="body2" sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            © {currentYear} CovidVax Portal. All rights reserved.
          </Typography>

          {/* Links */}
          <Box
            sx={{
              display: 'flex',
              gap: 3,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <Link
              href="#privacy"
              color="inherit"
              underline="hover"
              sx={{ cursor: 'pointer', fontSize: '0.875rem' }}
            >
              Privacy Policy
            </Link>
            <Link
              href="#terms"
              color="inherit"
              underline="hover"
              sx={{ cursor: 'pointer', fontSize: '0.875rem' }}
            >
              Terms
            </Link>
            <Link
              href="#contact"
              color="inherit"
              underline="hover"
              sx={{ cursor: 'pointer', fontSize: '0.875rem' }}
            >
              Contact Us
            </Link>
          </Box>

          {/* Social Media Icons */}
          <Stack direction="row" spacing={1}>
            <IconButton
              aria-label="LinkedIn"
              sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              aria-label="Twitter"
              sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              aria-label="Instagram"
              sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
            >
              <InstagramIcon />
            </IconButton>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

