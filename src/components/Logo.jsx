import React from 'react';
import { Box } from '@mui/material';

// Logo component using image
// Place your logo image in: frontend/public/logo.png
// Supported formats: PNG, SVG, JPG, WEBP
const Logo = ({ onClick, sx = {} }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        cursor: onClick ? 'pointer' : 'default',
        ...sx,
      }}
    >
      <img
        component="img"
        src="/logo.png"
        alt="CovidVax Portal Logo"
        width={225}
        height={70}
       
      />
    </Box>
  );
};

export default Logo;

