import React from 'react';
import { Box } from '@mui/material';
import LandingNavbar from '../components/LandingNavbar';
import Footer from '../components/Footer';
import Hero from '../components/Sections/Hero';
import About from '../components/Sections/About';
import HowItWorks from '../components/Sections/HowItWorks';
import Testimonials from '../components/Sections/Testimonials';
import CTA from '../components/Sections/CTA';

// Home/Landing page component
const Home = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: 'background.default',
      }}
    >
      <LandingNavbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Hero />
        <About />
        <HowItWorks />
        <Testimonials />
        <CTA />
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;

