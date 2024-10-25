import React, { useEffect, useState } from 'react';
import {
  Box, Container, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Chip
} from '@mui/material';
import axios from 'axios';
import AdminNavbar from '../components/AdminNavbar';

export const TechnicianComplaints = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const technicianId = localStorage.getItem('technicianId');

        if (!technicianId) {
          console.error('Technician ID not found in local storage');
          return;
        }

        console.log("Fetching complaints for technician ID:", technicianId);
        const response = await axios.get(`http://localhost:5000/api/technicians/complaints?technicianId=${technicianId}`);

        setComplaints(response.data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };

    fetchComplaints();
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High':
        return 'error';
      case 'Medium':
        return 'warning';
      case 'Low':
        return 'success';
      default:
        return 'default';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'On Process':
        return 'warning';
      case 'Grievance Solved':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <div>
      <AdminNavbar />
      <Container className="mt-32">
        <Typography variant="h4" gutterBottom>Assigned Complaints</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Complaint</TableCell>
                <TableCell>Lab</TableCell>
                <TableCell>System Number</TableCell>
                <TableCell>Severity</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {complaints.length > 0 ? (
                complaints.map(complaint => (
                  <TableRow key={complaint._id}>
                    <TableCell>{complaint.complaint}</TableCell>
                    <TableCell>{complaint.lab}</TableCell>
                    <TableCell>{complaint.systemNumber}</TableCell>
                    <TableCell>
                      <Chip 
                        label={complaint.severity} 
                        color={getSeverityColor(complaint.severity)} 
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={complaint.status} 
                        color={getStatusColor(complaint.status)} 
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">No complaints assigned to you.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};
