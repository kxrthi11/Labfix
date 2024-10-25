import React, { useState, useEffect } from 'react';
import { Box, Button, Container, Grid, Stack, TextField, Typography, Snackbar, Alert, Card, CardContent } from '@mui/material';
import axios from 'axios';
import MainNavbar from '../components/MainNavbar';
import "../styles/AddLab.css"; // Import the CSS file

const AddLab = () => {
  const [labData, setLabData] = useState({
    labName: '',
    description: ''
  });
  const [image, setImage] = useState(null); // For storing the selected image file
  const [labs, setLabs] = useState([]); // To store the list of added labs
  const [editMode, setEditMode] = useState(false); // To track if editing is happening
  const [labIdToEdit, setLabIdToEdit] = useState(null); // Store the ID of the lab being edited
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');

  // Fetch the list of labs on component mount
  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/labs');
        setLabs(response.data);
      } catch (error) {
        console.error('Error fetching labs:', error);
      }
    };

    fetchLabs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLabData({
      ...labData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Save the selected image file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to include the image file
    const formData = new FormData();
    formData.append('labName', labData.labName);
    formData.append('description', labData.description);
    if (image) formData.append('image', image); // Include the image only if one is selected

    if (editMode) {
      // Update the lab if in edit mode
      try {
        await axios.put(`http://localhost:5000/api/labs/edit/${labIdToEdit}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setMessage('Lab updated successfully');
        setSeverity('success');
        setEditMode(false);
        setLabIdToEdit(null);
      } catch (error) {
        setMessage('Error updating lab');
        setSeverity('error');
        console.error('Error updating lab:', error);
      }
    } else {
      // Add a new lab
      try {
        await axios.post('http://localhost:5000/api/labs/add', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setMessage('Lab added successfully');
        setSeverity('success');
      } catch (error) {
        setMessage('Error adding lab');
        setSeverity('error');
        console.error('Error adding lab:', error);
      }
    }

    // Fetch updated labs
    const response = await axios.get('http://localhost:5000/api/labs');
    setLabs(response.data);

    setOpen(true);
    setLabData({ labName: '', description: '' }); // Clear form after submission
    setImage(null); // Clear the image field
  };

  const handleEdit = (lab) => {
    setLabData({
      labName: lab.labName,
      description: lab.description
    });
    setImage(null); // Clear the image selection when editing
    setLabIdToEdit(lab._id);
    setEditMode(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <MainNavbar />
      <Container maxWidth="sm" className="container">
  <Box sx={{ mt: 15 }}>
    <Typography variant="h4" align="center" gutterBottom>
      {editMode ? 'Edit Lab' : 'Add New Lab'}
    </Typography>
    <form onSubmit={handleSubmit} encType="multipart/form-data">
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
        {/* Image upload input */}
        <Button variant="contained" component="label" className="upload-button">
          Upload Lab Image
          <input type="file" hidden accept="image/*" onChange={handleImageChange} />
        </Button>
        {image && (
          <Typography variant="body2" color="textSecondary">
            Selected file: {image.name}
          </Typography>
        )}
        <Button variant="contained" color="primary" type="submit" className="submit-button">
          {editMode ? 'Update Lab' : 'Add Lab'}
        </Button>
      </Stack>
    </form>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} className="snackbar">
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  </Box>

  {/* Display the list of labs with Edit button */}
  <Box sx={{ mt: 5 }}>
    <Typography variant="h5" align="center" gutterBottom>
      Labs
    </Typography>
    <Grid container spacing={2}>
      {labs.map((lab) => (
        <Grid item xs={12} sm={6} key={lab._id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{lab.labName}</Typography>
              <Typography variant="body2">{lab.description}</Typography>
              <Button
                variant="outlined"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => handleEdit(lab)}
              >
                Edit
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
</Container>

      <Box
        component="footer"
        sx={{
          py: 2,
          textAlign: 'center',
          backgroundColor: '#f1f1f1',
          width: '100%',
          mt: 'auto', // Pushes the footer to the bottom of the page
        }}
      ></Box>
    </div>
  );
};

export default AddLab;
