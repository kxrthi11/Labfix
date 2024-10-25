import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Stack, TextField, Typography, Paper, Snackbar, Alert, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { BlueButton } from '../components/buttonStyles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import psg from '../assets/psg.webp';

const Complain = () => {
    const [form, setForm] = useState({
        rollNo: '',
        email: '',
        lab: '',
        systemNumber: '',
        date: '',
        time: '',
        complaint: ''
    });
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');

    const navigate = useNavigate();

    useEffect(() => {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 10); // YYYY-MM-DD format
        const formattedTime = currentDate.toTimeString().slice(0, 5); // HH:MM format

        // Assuming user's email is stored in local storage or available via some API/context
        const loggedInUserEmail = localStorage.getItem('userEmail') || ''; // Replace with actual source
        const userRollNo = loggedInUserEmail.slice(0, 7); // First 7 characters of email for Roll No

        // Auto-fill the email and roll number
        setForm((prevForm) => ({
            ...prevForm,
            email: loggedInUserEmail,
            rollNo: userRollNo,
            date: formattedDate,
            time: formattedTime
        }));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/complaints', form);
            setMessage('Complaint registered successfully');
            setSeverity('success');
            setOpen(true);
    
            // Clear form fields but retain current date and time
            const currentDate = new Date();
            const formattedDate = currentDate.toISOString().slice(0, 10); // YYYY-MM-DD format
            const formattedTime = currentDate.toTimeString().slice(0, 5); // HH:MM format
    
            setForm({
                rollNo: form.rollNo, // Keep the rollNo as it is auto-filled
                email: form.email,   // Keep the email as it is auto-filled
                lab: '',
                systemNumber: '',
                date: formattedDate,
                time: formattedTime,
                complaint: ''
            });
        } catch (error) {
            setMessage('Error registering complaint');
            setSeverity('error');
            setOpen(true);
            console.error('There was an error registering the complaint!', error);
        }
    };
    

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container
            sx={{
                height: '100vh',
                backgroundImage: `url(${psg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Grid container sx={{ py: '100px', px: 5 }} spacing={2} justifyContent="center">
                <Grid item xs={12} md={8}>
                    <Paper elevation={6} sx={{ p: 4 }}>
                        <Box
                            sx={{
                                maxWidth: 550,
                                width: '100%'
                            }}
                        >
                            <form onSubmit={handleSubmit}>
                                <Stack spacing={5} sx={{ mb: 4 }}>
                                    <Typography variant="h4" align="center">Register Complaint</Typography>
                                </Stack>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={10}>
                                        <TextField
                                            fullWidth
                                            label="Roll No"
                                            type="text"
                                            name="rollNo"
                                            value={form.rollNo}
                                            onChange={handleChange}
                                            required
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            disabled // Disable to prevent editing
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={10}>
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            required
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            disabled // Disable to prevent editing
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth required>
                                            <InputLabel>Lab</InputLabel>
                                            <Select
                                                name="lab"
                                                value={form.lab}
                                                onChange={handleChange}
                                                label="Lab"
                                            >
                                                <MenuItem value="CC">CC</MenuItem>
                                                <MenuItem value="ISL">ISL</MenuItem>
                                                <MenuItem value="Project Lab">Project Lab</MenuItem>
                                                <MenuItem value="IBM">IBM</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth required>
                                            <InputLabel>System Number</InputLabel>
                                            <Select
                                                name="systemNumber"
                                                value={form.systemNumber}
                                                onChange={handleChange}
                                                label="System Number"
                                            >
                                                {Array.from({ length: 60 }, (_, index) => (
                                                    <MenuItem key={index + 1} value={index + 1}>
                                                        {index + 1}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Select Date"
                                            type="date"
                                            name="date"
                                            value={form.date}
                                            onChange={handleChange}
                                            required
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Time"
                                            type="time"
                                            name="time"
                                            value={form.time}
                                            onChange={handleChange}
                                            required
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Complaint"
                                            variant="outlined"
                                            name="complaint"
                                            value={form.complaint}
                                            onChange={handleChange}
                                            required
                                            multiline
                                            maxRows={4}
                                        />
                                    </Grid>
                                </Grid>
                                <Box display="flex" justifyContent="center" sx={{ mt: 3 }}>
                                    <BlueButton
                                        size="large"
                                        variant="contained"
                                        type="submit"
                                    >
                                        Submit
                                    </BlueButton>
                                </Box>
                            </form>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Complain;
