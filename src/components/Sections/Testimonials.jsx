import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import StarIcon from '@mui/icons-material/Star';

// Testimonials section component
const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Healthcare Worker',
      avatar: 'SJ',
      rating: 5,
      text: 'CovidVax Portal made it so easy to verify my vaccination certificate. The process was quick, and I earned reward points too! Highly recommend.',
    },
    {
      name: 'Michael Chen',
      role: 'Business Traveler',
      avatar: 'MC',
      rating: 5,
      text: 'As someone who travels frequently, having a verified certificate is essential. This platform is secure, fast, and reliable. Great service!',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Student',
      avatar: 'ER',
      rating: 5,
      text: 'I was skeptical at first, but the verification process was smooth and transparent. The rewards program is a nice bonus. Thank you!',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15,
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
            What Our Users Say
          </Typography>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div variants={itemVariants}>
                  <Card
                    sx={{
                      height: '100%',
                      p: 3,
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
                      },
                    }}
                  >
                    <CardContent>
                      {/* Rating Stars */}
                      <Box sx={{ display: 'flex', gap: 0.5, mb: 2 }}>
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <StarIcon
                            key={i}
                            sx={{ color: '#FFD700', fontSize: 20 }}
                          />
                        ))}
                      </Box>

                      {/* Testimonial Text */}
                      <Typography
                        variant="body1"
                        sx={{
                          color: 'text.secondary',
                          lineHeight: 1.8,
                          mb: 3,
                          fontStyle: 'italic',
                        }}
                      >
                        "{testimonial.text}"
                      </Typography>

                      {/* User Info */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar
                          sx={{
                            bgcolor: 'primary.main',
                            width: 56,
                            height: 56,
                            fontWeight: 600,
                          }}
                        >
                          {testimonial.avatar}
                        </Avatar>
                        <Box>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontWeight: 600,
                              color: 'text.primary',
                            }}
                          >
                            {testimonial.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: 'text.secondary',
                            }}
                          >
                            {testimonial.role}
                          </Typography>
                        </Box>
                      </Box>
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

export default Testimonials;

