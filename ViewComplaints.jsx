import React, { useEffect, useState } from 'react';
import {
  Box, Container, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, MenuItem, Select, FormControl, InputLabel,
  Modal, Button, Chip
} from '@mui/material';
import axios from 'axios';
import MainNavbar from '../components/MainNavbar';

const ViewComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [selectedLab, setSelectedLab] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/complaints');
        setComplaints(response.data);
        setFilteredComplaints(response.data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };
  
    fetchComplaints();
  }, []);

  // Sorting and filtering complaints by severity and excluding solved ones
  useEffect(() => {
    let sortedComplaints = [...complaints];

    if (selectedLab !== '') {
      sortedComplaints = sortedComplaints.filter(complaint => complaint.lab === selectedLab);
    }

    // Exclude complaints with status "Grievance Solved"
    sortedComplaints = sortedComplaints.filter(complaint => complaint.status !== 'Grievance Solved');

    // Sort by severity: High > Medium > Low
    sortedComplaints.sort((a, b) => {
      const severityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
      return severityOrder[a.severity] - severityOrder[b.severity];
    });

    setFilteredComplaints(sortedComplaints);
  }, [selectedLab, complaints]);

  const handleLabChange = (event) => {
    setSelectedLab(event.target.value);
  };

  const handleOpen = (complaint) => {
    setSelectedComplaint(complaint);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedComplaint(null);
  };

  const handleStatusUpdate = async (status) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/complaints/${selectedComplaint._id}`, { status });
      const updatedComplaint = response.data;

      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint._id === updatedComplaint._id ? updatedComplaint : complaint
        )
      );

      handleClose();
    } catch (error) {
      console.error('Error updating complaint status:', error);
    }
  };

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
      <MainNavbar />
      <Container className="mt-32">
        <Typography variant="h4" gutterBottom>View Complaints</Typography>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <FormControl variant="outlined" style={{ minWidth: 200 }}>
            <InputLabel id="lab-filter-label">Filter by Lab</InputLabel>
            <Select
              labelId="lab-filter-label"
              value={selectedLab}
              onChange={handleLabChange}
              label="Filter by Lab"
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              <MenuItem value="CC">CC</MenuItem>
              <MenuItem value="ISL">ISL</MenuItem>
              <MenuItem value="Project Lab">Project Lab</MenuItem>
              <MenuItem value="IBM">IBM</MenuItem>
            </Select>
          </FormControl>
        </Box>
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
                <TableCell>Severity</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredComplaints.map((complaint, index) => (
                <TableRow key={index} onClick={() => handleOpen(complaint)}>
                  <TableCell>{complaint.rollNo}</TableCell>
                  <TableCell>{complaint.email}</TableCell>
                  <TableCell>{complaint.lab}</TableCell>
                  <TableCell>{complaint.systemNumber}</TableCell>
                  <TableCell>{complaint.date}</TableCell>
                  <TableCell>{complaint.time}</TableCell>
                  <TableCell>{complaint.complaint}</TableCell>
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="complaint-modal-title"
        aria-describedby="complaint-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <Typography id="complaint-modal-title" variant="h6" component="h2">
            Complaint Details
          </Typography>
          {selectedComplaint && (
            <div>
              <Typography id="complaint-modal-description" sx={{ mt: 2 }}>
                <strong>Roll No:</strong> {selectedComplaint.rollNo}
              </Typography>
              <Typography id="complaint-modal-description" sx={{ mt: 2 }}>
                <strong>Email:</strong> {selectedComplaint.email}
              </Typography>
              <Typography id="complaint-modal-description" sx={{ mt: 2 }}>
                <strong>Lab:</strong> {selectedComplaint.lab}
              </Typography>
              <Typography id="complaint-modal-description" sx={{ mt: 2 }}>
                <strong>System Number:</strong> {selectedComplaint.systemNumber}
              </Typography>
              <Typography id="complaint-modal-description" sx={{ mt: 2 }}>
                <strong>Date:</strong> {selectedComplaint.date}
              </Typography>
              <Typography id="complaint-modal-description" sx={{ mt: 2 }}>
                <strong>Time:</strong> {selectedComplaint.time}
              </Typography>
              <Typography id="complaint-modal-description" sx={{ mt: 2 }}>
                <strong>Complaint:</strong> {selectedComplaint.complaint}
              </Typography>
              <Typography id="complaint-modal-description" sx={{ mt: 2 }}>
                <strong>Severity:</strong> {selectedComplaint.severity}
              </Typography>
              <Typography id="complaint-modal-description" sx={{ mt: 2 }}>
                <strong>Status:</strong> {selectedComplaint.status}
              </Typography>
              {/* <Box display="flex" justifyContent="space-between" mt={4}>
                <Button variant="contained" color="primary" onClick={() => handleStatusUpdate('On Process')}>
                  Mark as On Process
                </Button>
                <Button variant="contained" color="success" onClick={() => handleStatusUpdate('Grievance Solved')}>
                  Mark as Solved
                </Button>
              </Box> */}
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default ViewComplaints;
