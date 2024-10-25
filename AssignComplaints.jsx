import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Modal,
} from '@mui/material';
import axios from 'axios';
import MainNavbar from '../components/MainNavbar';

const AssignComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [selectedTechnician, setSelectedTechnician] = useState('');
  const [open, setOpen] = useState(false);

  // Fetch complaints and technicians
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/complaints');
        const unsolvedComplaints = response.data.filter(complaint => complaint.status !== 'Grievance Solved');
        setComplaints(unsolvedComplaints);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };

    const fetchTechnicians = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/technicians');
        setTechnicians(response.data);
      } catch (error) {
        console.error('Error fetching technicians:', error);
      }
    };

    fetchComplaints();
    fetchTechnicians();
  }, []);

  // Handle opening the modal to assign a technician
  const handleOpen = (complaint) => {
    setSelectedComplaint(complaint);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedComplaint(null);
  };

  const handleTechnicianChange = (event) => {
    setSelectedTechnician(event.target.value);
  };

  // Handle assigning a technician
  const handleAssignTechnician = async () => {
    if (!selectedComplaint || !selectedTechnician) return;

    const assignedAt = new Date();

    try {
      const response = await axios.put(
        `http://localhost:5000/api/complaints/${selectedComplaint._id}`,
        {
          assignedTechnician: selectedTechnician,
          assignedAt: assignedAt,
        }
      );

      const updatedComplaint = response.data;
      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint._id === updatedComplaint._id ? updatedComplaint : complaint
        )
      );
      handleClose();
    } catch (error) {
      console.error('Error assigning technician:', error);
    }
  };

  return (
    <div>
      <MainNavbar />
      <Container sx={{ backgroundColor: '#5b73a8', borderRadius: '8px', padding: '20px', mt: 15 }}>
        <Typography variant="h4" gutterBottom>Assign Technicians to Complaints</Typography>
        <TableContainer component={Paper} sx={{ borderRadius: '8px', boxShadow: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Roll No</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Lab</TableCell>
                <TableCell>System Number</TableCell>
                <TableCell>Complaint</TableCell>
                <TableCell>Severity</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Assigned Technician</TableCell>
                <TableCell>Assign Technician</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {complaints.map((complaint) => (
                <TableRow key={complaint._id}>
                  <TableCell>{complaint.rollNo}</TableCell>
                  <TableCell>{complaint.email}</TableCell>
                  <TableCell>{complaint.lab}</TableCell>
                  <TableCell>{complaint.systemNumber}</TableCell>
                  <TableCell>{complaint.complaint}</TableCell>
                  <TableCell>{complaint.severity}</TableCell>
                  <TableCell>{complaint.status}</TableCell>
                  <TableCell>
                    {complaint.assignedTechnician ? (
                      <Typography variant="body1">{complaint.assignedTechnician.name}</Typography>
                    ) : (
                      <Typography variant="body2" color="textSecondary">Not Assigned</Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    {!complaint.assignedTechnician && (
                      <Button variant="contained" color="primary" onClick={() => handleOpen(complaint)}>
                        Assign Technician
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/* Modal for assigning a technician */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...modalStyle, width: 500 }}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" gutterBottom>Assign Technician</Typography>
            {selectedComplaint && (
              <>
                <Typography><strong>Complaint:</strong> {selectedComplaint.complaint}</Typography>
                <Typography><strong>Severity:</strong> {selectedComplaint.severity}</Typography>
                <Typography><strong>Date:</strong> {new Date(selectedComplaint.createdAt).toLocaleDateString()}</Typography>
                <Typography><strong>Time:</strong> {new Date(selectedComplaint.createdAt).toLocaleTimeString()}</Typography>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="technician-select-label">Select Technician</InputLabel>
                  <Select
                    labelId="technician-select-label"
                    value={selectedTechnician}
                    onChange={handleTechnicianChange}
                  >
                    {technicians.map((technician) => (
                      <MenuItem key={technician._id} value={technician._id}>
                        {technician.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button variant="contained" color="primary" onClick={handleAssignTechnician}>
                  Assign
                </Button>
              </>
            )}
          </Paper>
        </Box>
      </Modal>
    </div>
  );
};

// Modal style
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default AssignComplaints;
