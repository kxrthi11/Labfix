import React, { useState } from 'react';
import { Box, Button, Container, Grid, TextField, Typography, MenuItem } from '@mui/material';

const Users = () => {
  const [users, setUsers] = useState([{ name: '', email: '', password: '', yearOfStudy: '' }]);

  const handleInputChange = (index, event) => {
    const values = [...users];
    values[index][event.target.name] = event.target.value;
    setUsers(values);
  };

  const handleAddFields = () => {
    setUsers([...users, { name: '', email: '', password: '', yearOfStudy: '' }]);
  };

  const handleRemoveFields = (index) => {
    const values = [...users];
    values.splice(index, 1);
    setUsers(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/users/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(users),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Users added successfully');
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding users');
    }
  };

  return (
    <Container sx={{ backgroundColor: '#566fa3', borderRadius: '8px', padding: '20px', mt: 4 }}>
      <Typography variant="h4" gutterBottom>Add Users</Typography>
      <form onSubmit={handleSubmit}>
        {users.map((user, index) => (
          <Box key={index} mb={3} p={3} sx={{ backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: 2 }}>
            <Grid container spacing={4}> {/* Add spacing between fields */}
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={user.name}
                  onChange={(event) => handleInputChange(index, event)}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                  placeholder="Enter name"
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={(event) => handleInputChange(index, event)}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                  placeholder="Enter email"
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={(event) => handleInputChange(index, event)}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                  placeholder="Enter password"
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  select
                  fullWidth
                  label="Year of Study"
                  name="yearOfStudy"
                  value={user.yearOfStudy}
                  onChange={(event) => handleInputChange(index, event)}
                  required
                >
                  <MenuItem value="1st year">1st Year</MenuItem>
                  <MenuItem value="2nd year">2nd Year</MenuItem>
                </TextField>
              </Grid>
            </Grid>

            <Box mt={2}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleRemoveFields(index)}
                disabled={users.length === 1}
              >
                REMOVE
              </Button>
            </Box>
          </Box>
        ))}

        <Box mt={4} className="flex justify-between">
          <Button variant="contained" color="primary" onClick={handleAddFields}>
            Add User
          </Button>
          <Button variant="contained" color="secondary" type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default Users;
