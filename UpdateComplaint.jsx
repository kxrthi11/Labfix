import React, { useEffect, useState } from 'react';
import {
  Box, Container, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, MenuItem, Select, FormControl, InputLabel,
  Modal, Button, CircularProgress
} from '@mui/material';
import axios from 'axios';
import AdminNavbar from '../components/AdminNavbar';

const UpdateComplaint = () => {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [selectedLab, setSelectedLab] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const technicianId = localStorage.getItem('technicianId');
        if (!technicianId) {
          console.error('Technician ID not found in local storage');
          return;
        }

        // Fetch complaints assigned to the technician
        const response = await axios.get(`http://localhost:5000/api/technicians/complaints?technicianId=${technicianId}`);
        setComplaints(response.data);
        setFilteredComplaints(response.data); // Set both states with the same data initially
      } catch (error) {
        console.error('Error fetching complaints:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchComplaints();
  }, []);

  // Filter complaints based on selected lab and exclude 'Grievance Solved' complaints
  useEffect(() => {
    let filtered = complaints;
    if (selectedLab) {
      filtered = complaints.filter(complaint => complaint.lab === selectedLab);
    }
    filtered = filtered.filter(complaint => complaint.status !== 'Grievance Solved');
    setFilteredComplaints(filtered);
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
    if (!selectedComplaint) return;

    try {
      const response = await axios.put(
        `http://localhost:5000/api/complaints/status/${selectedComplaint._id}`,
        { status }
      );

      const updatedComplaint = response.data;

      // Update complaints array and remove solved complaints
      setComplaints((prevComplaints) =>
        prevComplaints
          .map(complaint => complaint._id === updatedComplaint._id ? updatedComplaint : complaint)
          .filter(complaint => complaint.status !== 'Grievance Solved')
      );

      handleClose(); // Close the modal after updating
    } catch (error) {
      console.error('Error updating complaint status:', error);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <Container className="mt-32">
        <Typography variant="h4" gutterBottom>Update Complaints</Typography>
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

        {/* Show loading spinner while fetching complaints */}
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="300px">
            <CircularProgress />
          </Box>
        ) : (
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
                {filteredComplaints.map((complaint, index) => (
                  <TableRow key={index} onClick={() => handleOpen(complaint)} style={{ cursor: 'pointer' }}>
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
        )}
      </Container>

      <ComplaintModal
        open={open}
        handleClose={handleClose}
        complaint={selectedComplaint}
        handleStatusUpdate={handleStatusUpdate}
      />
    </div>
  );
};

// Separate Modal component for updating complaints
const ComplaintModal = ({ open, handleClose, complaint, handleStatusUpdate }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    width: 400,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="complaint-modal-title"
      aria-describedby="complaint-modal-description"
    >
      <Box sx={style}>
        <Typography id="complaint-modal-title" variant="h6" component="h2">
          Complaint Details
        </Typography>
        {complaint && (
          <>
            <Typography><strong>Roll No:</strong> {complaint.rollNo}</Typography>
            <Typography><strong>Email:</strong> {complaint.email}</Typography>
            <Typography><strong>Lab:</strong> {complaint.lab}</Typography>
            <Typography><strong>System Number:</strong> {complaint.systemNumber}</Typography>
            <Typography><strong>Date:</strong> {complaint.date}</Typography>
            <Typography><strong>Time:</strong> {complaint.time}</Typography>
            <Typography><strong>Complaint:</strong> {complaint.complaint}</Typography>
            <Typography><strong>Current Status:</strong> {complaint.status}</Typography>
            <Box display="flex" justifyContent="space-between" mt={4}>
              <Button variant="contained" color="primary" onClick={() => handleStatusUpdate('In Process')}>
                In Process
              </Button>
              <Button variant="contained" color="secondary" onClick={() => handleStatusUpdate('Grievance Solved')}>
                Grievance Solved
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default UpdateComplaint;
