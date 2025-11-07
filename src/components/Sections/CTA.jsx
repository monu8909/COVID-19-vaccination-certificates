import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Call-to-Action section component
const CTA = () => {
  const navigate = useNavigate();

  return (
    <Box
      id="contact"
      sx={{
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(135deg, #3A9BDC 0%, #2A7BC8 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: 'radial-gradient(circle at 80% 50%, white 0%, transparent 50%)',
        }}
      />

      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 700,
                mb: 3,
                fontSize: { xs: '2rem', md: '3rem' },
              }}
            >
              Join the CovidVax Community Today!
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mb: 4,
                opacity: 0.95,
                fontWeight: 400,
                fontSize: { xs: '1rem', md: '1.25rem' },
                maxWidth: '600px',
                mx: 'auto',
              }}
            >
              Start your journey towards verified vaccination certificates and earn rewards along the way.
            </Typography>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/register')}
                sx={{
                  backgroundColor: 'white',
                  color: 'primary.main',
                  px: 6,
                  py: 2,
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  borderRadius: 3,
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    boxShadow: '0 6px 25px rgba(0, 0, 0, 0.3)',
                  },
                }}
              >
                Sign Up Now
              </Button>
            </motion.div>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default CTA;

