const express = require('express');
const router = express.Router();
const Technician = require('../models/Technician');
const Complaint = require('../models/Complaint');  // Import the Complaint model
const bcrypt = require('bcryptjs');

// Route to add a technician
router.post('/', async (req, res) => {
  const { name, email, password, expertise } = req.body;

  try {
    const newTechnician = new Technician({
      name,
      email,
      password,
      expertise
    });
    await newTechnician.save();
    res.status(201).json({ message: 'Technician added successfully' });
  } catch (error) {
    console.error('Error adding technician:', error);
    res.status(500).json({ message: 'Failed to add technician' });
  }
});

// Route for technician login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const technician = await Technician.findOne({ email });
    if (!technician) {
      return res.status(404).json({ message: 'Technician not found' });
    }

    const isMatch = await bcrypt.compare(password, technician.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({
      message: 'Login successful',
      technicianId: technician._id
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to fetch all technicians
router.get('/', async (req, res) => {
  try {
    const technicians = await Technician.find();
    res.status(200).json(technicians);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// New route to fetch complaints assigned to a specific technician
router.get('/complaints', async (req, res) => {
  const { technicianId } = req.query;
  try {
    // Fetch complaints assigned to the specified technician
    const complaints = await Complaint.find({ assignedTechnician: technicianId }).populate('assignedTechnician');
    
    if (!complaints || complaints.length === 0) {
      return res.status(404).json({ message: 'No complaints found for this technician.' });
    }

    res.status(200).json(complaints);
  } catch (error) {
    console.error('Error fetching technician complaints:', error);
    res.status(500).json({ message: 'Server error while fetching complaints.', error });
  }
});




module.exports = router;
