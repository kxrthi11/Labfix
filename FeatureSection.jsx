import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Container, Box, CardMedia } from '@mui/material';

const Homepage = () => {
  const [labs, setLabs] = useState([]);

  // Fetch labs from the backend
  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/labs');
        setLabs(response.data); // Store the fetched labs in the state
      } catch (error) {
        console.error('Error fetching labs:', error);
      }
    };

    fetchLabs();
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Labs
        </Typography>
        <Grid container spacing={4}>
          {labs.map((lab) => (
            <Grid item xs={12} sm={6} md={4} key={lab._id}>
              <Card sx={{ height: '100%' }}>
                {/* Image displayed at the top */}
                {lab.imageUrl && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={lab.imageUrl} // Path to the image
                    alt={lab.labName}
                  />
                )}
                <CardContent>
                  <Typography variant="h5" component="div">
                    {lab.labName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {lab.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Homepage;
