import React, { useEffect, useState } from 'react';
import {
  Box, Container, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper
} from '@mui/material';
import axios from 'axios';
import MainNavbar from '../components/MainNavbar';
 // Adjust the import as per your project structure

const HistoryOfComplaints = () => {
  const [solvedComplaints, setSolvedComplaints] = useState([]);

  useEffect(() => {
    const fetchSolvedComplaints = async () => {
      try {
        const response = await axios.get('http://localhost:5000/history');
        setSolvedComplaints(response.data); // Update state with the solved complaints
      } catch (error) {
        console.error('Error fetching solved complaints:', error);
      }
    };
  
    fetchSolvedComplaints();
  }, []);

  return (
    <div>
      <MainNavbar />
      <Container className="mt-32">
        <Typography variant="h4" gutterBottom>
          History of Solved Complaints
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Roll No</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Lab</TableCell>
                <TableCell>System Number</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Complaint</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {solvedComplaints.map((complaint, index) => (
                <TableRow key={index}>
                  <TableCell>{complaint.rollNo}</TableCell>
                  <TableCell>{complaint.email}</TableCell>
                  <TableCell>{complaint.lab}</TableCell>
                  <TableCell>{complaint.systemNumber}</TableCell>
                  <TableCell>{complaint.date}</TableCell>
                  <TableCell>{complaint.time}</TableCell>
                  <TableCell>{complaint.complaint}</TableCell>
                  <TableCell>{complaint.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default HistoryOfComplaints;
