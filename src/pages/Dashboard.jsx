import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Pending, Cancel, Star, EmojiEvents } from '@mui/icons-material';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

// Dashboard page component - shows user's certificates
const Dashboard = () => {
  const navigate = useNavigate();
  const { user, api } = useAuth();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [rewardPoints, setRewardPoints] = useState(0);
  const [userData, setUserData] = useState(null);

  // Fetch user's certificates and profile
  useEffect(() => {
    fetchCertificates();
    fetchUserProfile();
  }, []);

  const fetchCertificates = async () => {
    try {
      const response = await api.get('/certificates/my-certificates');
      setCertificates(response.data.certificates);
      // Refresh user profile after fetching certificates to get updated points
      await fetchUserProfile();
    } catch (error) {
      console.error('Error fetching certificates:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await api.get('/auth/me');
      setUserData(response.data.user);
      // Set reward points from API response
      const points = response.data.user.rewardPoints || 0;
      setRewardPoints(points);
      console.log('Reward Points:', response); // Debug log to verify points
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  // Check for verified certificates and show success message with reward points
  useEffect(() => {
    const verifiedCert = certificates.find((cert) => cert.status === 'verified');
    if (verifiedCert) {
      const verifiedCount = certificates.filter((cert) => cert.status === 'verified').length;
      setSuccessMessage(
        `Your certificate has been verified successfully! You earned ${verifiedCount * 100} reward points! 🎉`
      );
    }
  }, [certificates]);

  // Refresh user data when certificates change (to get updated reward points)
  useEffect(() => {
    if (certificates.length > 0) {
      // Add a small delay to ensure backend has updated points
      const timer = setTimeout(() => {
        fetchUserProfile();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [certificates]);

  // Get status chip color and icon
  const getStatusChip = (status) => {
    switch (status) {
      case 'verified':
        return (
          <Chip
            icon={<CheckCircle />}
            label="Verified"
            color="success"
            size="small"
          />
        );
      case 'pending':
        return (
          <Chip
            icon={<Pending />}
            label="Pending"
            color="warning"
            size="small"
          />
        );
      case 'rejected':
        return (
          <Chip
            icon={<Cancel />}
            label="Rejected"
            color="error"
            size="small"
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {user?.name || user?.email}!
        </Typography>

        {/* Reward Points Card */}
        <Card
          sx={{
            mb: 3,
            background: 'linear-gradient(135deg, #3A9BDC 0%, #2A7BC8 100%)',
            color: 'white',
          }}
        >
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <EmojiEvents sx={{ fontSize: 40 }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Reward Points
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700, mt: 1 }}>
                    {rewardPoints}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
                    {certificates.filter((c) => c.status === 'verified').length > 0
                      ? `${certificates.filter((c) => c.status === 'verified').length} verified certificate(s) × 100 points`
                      : 'Earn 100 points for each verified certificate'}
                  </Typography>
                </Box>
              </Box>
              <Star sx={{ fontSize: 60, opacity: 0.3 }} />
            </Box>
          </CardContent>
        </Card>

        {successMessage && (
          <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccessMessage('')}>
            {successMessage}
          </Alert>
        )}

        <Box sx={{ mb: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/upload')}
            size="large"
          >
            Upload New Certificate
          </Button>
        </Box>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          My Certificates
        </Typography>

        {loading ? (
          <Typography>Loading...</Typography>
        ) : certificates.length === 0 ? (
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="body1" color="text.secondary">
              No certificates uploaded yet. Upload your first certificate to get started!
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {certificates.map((certificate) => (
              <Grid item xs={12} sm={6} md={4} key={certificate._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {certificate.fileName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Type: {certificate.fileType.toUpperCase()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Uploaded: {new Date(certificate.createdAt).toLocaleDateString()}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      {getStatusChip(certificate.status)}
                    </Box>
                    {certificate.rejectionReason && (
                      <Alert severity="error" sx={{ mt: 2 }}>
                        {certificate.rejectionReason}
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default Dashboard;

