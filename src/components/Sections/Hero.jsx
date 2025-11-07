import React from 'react';
import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

// Hero section component with animations
const Hero = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #3A9BDC 0%, #2A7BC8 100%)',
        color: 'white',
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: 'radial-gradient(circle at 20% 50%, white 0%, transparent 50%)',
        }}
      />

      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            {/* Icon */}
            <motion.div
              variants={itemVariants}
              style={{ display: 'inline-block', marginBottom: '1rem' }}
            >
              <HealthAndSafetyIcon sx={{ fontSize: 80, mb: 2 }} />
            </motion.div>

            {/* Main Heading */}
            <motion.div variants={itemVariants}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  lineHeight: 1.2,
                }}
              >
                Verify Your COVID Vaccine Certificate in Minutes
              </Typography>
            </motion.div>

            {/* Subheading */}
            <motion.div variants={itemVariants}>
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  fontWeight: 400,
                  opacity: 0.95,
                  fontSize: { xs: '1.1rem', md: '1.5rem' },
                  maxWidth: '700px',
                  mx: 'auto',
                }}
              >
                Upload, verify, and earn rewards for contributing to global health safety.
              </Typography>
            </motion.div>

            {/* Buttons */}
            <motion.div variants={itemVariants}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent="center"
                sx={{ mt: 4 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/register')}
                  sx={{
                    backgroundColor: 'white',
                    color: 'primary.main',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    },
                  }}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/login')}
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  Check Status
                </Button>
              </Stack>
            </motion.div>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Hero;

