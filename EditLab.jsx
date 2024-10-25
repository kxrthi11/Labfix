import React, { useState, useEffect } from 'react';
import { Box, Button, Container, Stack, TextField, Typography, Snackbar, Alert } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminNavbar from '../components/AdminNavbar';

const EditLab = () => {
  const { id } = useParams(); // Get lab ID from the route parameters
  const [labData, setLabData] = useState({ labName: '', description: '' });
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const navigate = useNavigate();

  // Fetch the lab details when the component mounts
  useEffect(() => {
    const fetchLab = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/labs/${id}`);
        setLabData(response.data);
      } catch (error) {
        console.error('Error fetching lab details:', error);
      }
    };

    fetchLab();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLabData({
      ...labData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/labs/edit/${id}`, labData);
      setMessage('Lab updated successfully');
      setSeverity('success');
      setOpen(true);
      setTimeout(() => {
        navigate('/admin'); // Redirect to admin dashboard or lab list after successful update
      }, 2000);
    } catch (error) {
      setMessage('Error updating lab');
      setSeverity('error');
      setOpen(true);
      console.error('Error updating lab:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <AdminNavbar />
      <Container maxWidth="sm">
        <Box sx={{ mt: 15 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Edit Lab
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Lab Name"
                name="labName"
                value={labData.labName}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                label="Lab Description"
                name="description"
                value={labData.description}
                onChange={handleChange}
                multiline
                rows={3}
                required
              />
              <Button variant="contained" color="primary" type="submit">
                Update Lab
              </Button>
            </Stack>
          </form>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity}>
              {message}
            </Alert>
          </Snackbar>
        </Box>
      </Container>
      <Box
        component="footer"
        sx={{
          py: 2,
          textAlign: 'center',
          backgroundColor: '#f1f1f1',
          width: '100%',
          mt: 'auto',
        }}
      ></Box>
    </div>
  );
};

export default EditLab;
