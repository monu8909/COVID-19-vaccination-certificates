import React from 'react';
import { Box, Container, Typography, Grid, Paper, Step, StepLabel, Stepper } from '@mui/material';
import { motion } from 'framer-motion';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VerifiedIcon from '@mui/icons-material/Verified';

// How It Works section component
const HowItWorks = () => {
  const steps = [
    {
      icon: <PersonAddIcon sx={{ fontSize: 60 }} />,
      title: 'Register / Login',
      description: 'Create your account in seconds with just your email and password. It\'s quick, easy, and secure.',
    },
    {
      icon: <CloudUploadIcon sx={{ fontSize: 60 }} />,
      title: 'Upload Certificate',
      description: 'Upload your COVID-19 vaccination certificate (PDF or image). Our system accepts all standard formats.',
    },
    {
      icon: <VerifiedIcon sx={{ fontSize: 60 }} />,
      title: 'Get Verified & Earn Rewards',
      description: 'Our admin team reviews and verifies your certificate. Once verified, you earn reward points!',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <Box
      id="how-it-works"
      sx={{
        py: { xs: 6, md: 10 },
        backgroundColor: 'white',
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
            How It Works
          </Typography>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {steps.map((step, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div variants={itemVariants}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      textAlign: 'center',
                      height: '100%',
                      border: '2px solid',
                      borderColor: 'primary.main',
                      borderRadius: 3,
                      backgroundColor: 'background.default',
                      transition: 'all 0.3s',
                      '&:hover': {
                        borderColor: 'primary.dark',
                        backgroundColor: 'rgba(58, 155, 220, 0.05)',
                        transform: 'translateY(-5px)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        color: 'primary.main',
                        mb: 3,
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      {step.icon}
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
                      {step.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'text.secondary',
                        lineHeight: 1.7,
                      }}
                    >
                      {step.description}
                    </Typography>
                    <Box
                      sx={{
                        mt: 3,
                        fontSize: '2rem',
                        fontWeight: 700,
                        color: 'primary.main',
                        opacity: 0.3,
                      }}
                    >
                      {index + 1}
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default HowItWorks;

