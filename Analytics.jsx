import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Container, Typography, Box } from '@mui/material';
import AdminNavbar from '../components/AdminNavbar';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register the required components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const AdminAnalytics = () => {
    const data = {
        labels: ['Registered', 'Solved', 'In Process'],
        datasets: [
            {
                label: 'Complaints',
                data: [50, 30, 20], // Static data for example
                backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f'],
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <AdminNavbar /> {/* Add the Navbar component */}
            <Container>
                <Box mt={10}> {/* Add margin-top to create space below the navbar */}
                    <Typography variant="h4" gutterBottom>
                        Complaints Analytics
                    </Typography>
                    <Bar data={data} options={options} />
                </Box>
            </Container>
        </div>
    );
};

export default AdminAnalytics;
