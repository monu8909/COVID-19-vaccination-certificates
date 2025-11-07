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
import { CheckCircle, Pending, Cancel } from '@mui/icons-material';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

// Dashboard page component - shows user's certificates
const Dashboard = () => {
  const navigate = useNavigate();
  const { user, api } = useAuth();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch user's certificates
  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const response = await api.get('/certificates/my-certificates');
      setCertificates(response.data.certificates);
    } catch (error) {
      console.error('Error fetching certificates:', error);
    } finally {
      setLoading(false);
    }
  };

  // Check for verified certificates and show success message
  useEffect(() => {
    const verifiedCert = certificates.find((cert) => cert.status === 'verified');
    if (verifiedCert) {
      setSuccessMessage('Your certificate has been verified successfully!');
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

