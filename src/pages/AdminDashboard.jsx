import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Card,
  CardContent,
  Alert,
  Pagination,
} from '@mui/material';
import {
  CheckCircle,
  Cancel,
  Pending,
  Visibility,
} from '@mui/icons-material';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

// Admin Dashboard page component - review and verify certificates
const AdminDashboard = () => {
  const { api } = useAuth();
  const [certificates, setCertificates] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, verified: 0, rejected: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedCert, setSelectedCert] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, pages: 1 });
  const [message, setMessage] = useState({ type: '', text: '' });

  // Fetch certificates and stats
  useEffect(() => {
    fetchCertificates();
    fetchStats();
  }, [page]);

  const fetchCertificates = async () => {
    try {
      const response = await api.get(`/admin/certificates?page=${page}&limit=10`);
      setCertificates(response.data.certificates);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Error fetching certificates:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await api.get('/admin/stats');
      setStats(response.data.stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  // Handle verify certificate
  const handleVerify = async (certId) => {
    try {
      await api.patch(`/admin/certificates/${certId}/verify`);
      setMessage({
        type: 'success',
        text: 'Certificate verified successfully!',
      });
      fetchCertificates();
      fetchStats();
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Error verifying certificate',
      });
    }
  };

  // Handle reject certificate
  const handleReject = async () => {
    if (!selectedCert) return;

    try {
      await api.patch(`/admin/certificates/${selectedCert._id}/reject`, {
        reason: rejectReason || 'Certificate rejected by admin',
      });
      setMessage({
        type: 'success',
        text: 'Certificate rejected successfully!',
      });
      setDialogOpen(false);
      setRejectReason('');
      setSelectedCert(null);
      fetchCertificates();
      fetchStats();
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Error rejecting certificate',
      });
    }
  };

  // Open reject dialog
  const openRejectDialog = (certificate) => {
    setSelectedCert(certificate);
    setDialogOpen(true);
  };

  // Get status chip
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
          Admin Dashboard
        </Typography>

        {message.text && (
          <Alert
            severity={message.type}
            sx={{ mb: 3 }}
            onClose={() => setMessage({ type: '', text: '' })}
          >
            {message.text}
          </Alert>
        )}

        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Total Certificates
                </Typography>
                <Typography variant="h4">{stats.total}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Pending Review
                </Typography>
                <Typography variant="h4" color="warning.main">
                  {stats.pending}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Verified
                </Typography>
                <Typography variant="h4" color="success.main">
                  {stats.verified}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Rejected
                </Typography>
                <Typography variant="h4" color="error.main">
                  {stats.rejected}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Certificates Table */}
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User Email</TableCell>
                  <TableCell>File Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Uploaded</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : certificates.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No certificates found
                    </TableCell>
                  </TableRow>
                ) : (
                  certificates.map((certificate) => (
                    <TableRow key={certificate._id}>
                      <TableCell>
                        {certificate.userId?.email || 'N/A'}
                      </TableCell>
                      <TableCell>{certificate.fileName}</TableCell>
                      <TableCell>{certificate.fileType.toUpperCase()}</TableCell>
                      <TableCell>{getStatusChip(certificate.status)}</TableCell>
                      <TableCell>
                        {new Date(certificate.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button
                            size="small"
                            variant="outlined"
                            href={`/api/certificates/${certificate._id}/file`}
                            target="_blank"
                            startIcon={<Visibility />}
                          >
                            View
                          </Button>
                          {certificate.status === 'pending' && (
                            <>
                              <Button
                                size="small"
                                variant="contained"
                                color="success"
                                onClick={() => handleVerify(certificate._id)}
                                startIcon={<CheckCircle />}
                              >
                                Verify
                              </Button>
                              <Button
                                size="small"
                                variant="contained"
                                color="error"
                                onClick={() => openRejectDialog(certificate)}
                                startIcon={<Cancel />}
                              >
                                Reject
                              </Button>
                            </>
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
              <Pagination
                count={pagination.pages}
                page={page}
                onChange={(e, value) => setPage(value)}
                color="primary"
              />
            </Box>
          )}
        </Paper>

        {/* Reject Dialog */}
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle>Reject Certificate</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Rejection Reason"
              fullWidth
              multiline
              rows={4}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleReject} color="error" variant="contained">
              Reject
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default AdminDashboard;

