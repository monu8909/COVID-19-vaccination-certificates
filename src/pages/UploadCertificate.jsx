import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Alert,
  LinearProgress,
} from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

// Upload Certificate page component
const UploadCertificate = () => {
  const navigate = useNavigate();
  const { api } = useAuth();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Validate file type
      const fileType = selectedFile.type;
      const isValidType =
        fileType === 'application/pdf' ||
        fileType.startsWith('image/');

      if (!isValidType) {
        setMessage({
          type: 'error',
          text: 'Please select a PDF or image file (JPEG, PNG, GIF)',
        });
        return;
      }

      // Validate file size (10MB limit)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setMessage({
          type: 'error',
          text: 'File size must be less than 10MB',
        });
        return;
      }

      setFile(selectedFile);
      setMessage({ type: '', text: '' });
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) {
      setMessage({
        type: 'error',
        text: 'Please select a file to upload',
      });
      return;
    }

    setUploading(true);
    setMessage({ type: '', text: '' });

    try {
      const formData = new FormData();
      formData.append('certificate', file);

      const response = await api.post('/certificates/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage({
        type: 'success',
        text: 'Certificate uploaded successfully! It will be reviewed by an admin.',
      });

      // Clear file input
      setFile(null);
      document.getElementById('file-input').value = '';

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Error uploading certificate',
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Typography variant="h4" gutterBottom>
            Upload Vaccine Certificate
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Upload your COVID-19 vaccination certificate (PDF or Image). The certificate will be
            reviewed by an administrator.
          </Typography>

          {message.text && (
            <Alert severity={message.type} sx={{ mb: 3 }} onClose={() => setMessage({ type: '', text: '' })}>
              {message.text}
            </Alert>
          )}

          <Box
            sx={{
              border: '2px dashed #ccc',
              borderRadius: 2,
              p: 4,
              textAlign: 'center',
              mb: 3,
              backgroundColor: '#f9f9f9',
            }}
          >
            <CloudUpload sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography variant="body1" gutterBottom>
              {file ? file.name : 'Select a file to upload'}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              PDF or Image files (JPEG, PNG, GIF) up to 10MB
            </Typography>
            <input
              accept=".pdf,image/*"
              style={{ display: 'none' }}
              id="file-input"
              type="file"
              onChange={handleFileChange}
              disabled={uploading}
            />
            <label htmlFor="file-input">
              <Button
                variant="outlined"
                component="span"
                disabled={uploading}
                sx={{ mt: 1 }}
              >
                Choose File
              </Button>
            </label>
          </Box>

          {uploading && (
            <Box sx={{ mb: 3 }}>
              <LinearProgress />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Uploading...
              </Typography>
            </Box>
          )}

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              onClick={handleUpload}
              disabled={!file || uploading}
              size="large"
            >
              {uploading ? 'Uploading...' : 'Upload Certificate'}
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/dashboard')}
              disabled={uploading}
            >
              Cancel
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default UploadCertificate;

