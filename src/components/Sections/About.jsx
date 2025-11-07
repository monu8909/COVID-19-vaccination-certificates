import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

// About/Why Use Us section component
const About = () => {
  const features = [
    {
      icon: <SecurityIcon sx={{ fontSize: 50 }} />,
      title: 'Secure Uploads',
      description: 'Your certificate data is encrypted and stored securely. We prioritize your privacy and data protection.',
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 50 }} />,
      title: 'Fast Verification',
      description: 'Get your certificate verified quickly by our team of experts. Most verifications completed within 24 hours.',
    },
    {
      icon: <CardGiftcardIcon sx={{ fontSize: 50 }} />,
      title: 'Earn Rewards',
      description: 'Receive reward points for verified certificates. Redeem points for exclusive benefits and discounts.',
    },
    {
      icon: <VerifiedUserIcon sx={{ fontSize: 50 }} />,
      title: 'Trusted Platform',
      description: 'Join thousands of users who trust CovidVax Portal for secure and reliable certificate verification.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
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
      id="about"
      sx={{
        py: { xs: 6, md: 10 },
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h3"
            component="h2"
            sx={{
              textAlign: 'center',
              mb: 6,
              fontWeight: 700,
              color: 'text.primary',
            }}
          >
            Why Use CovidVax Portal?
          </Typography>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div variants={itemVariants}>
                  <Card
                    sx={{
                      height: '100%',
                      textAlign: 'center',
                      p: 3,
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
                      },
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          color: 'primary.main',
                          mb: 2,
                          display: 'flex',
                          justifyContent: 'center',
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography
                        variant="h5"
                        component="h3"
                        sx={{
                          fontWeight: 600,
                          mb: 2,
                          color: 'text.primary',
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: 'text.secondary',
                          lineHeight: 1.7,
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default About;

