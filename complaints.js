const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Complaint = require('../models/Complaint'); // Adjust the path according to your file structure
const Technician = require('../models/Technician'); // Assuming you have a Technician model

// Function to determine severity based on the complaint text
const determineSeverity = (complaintText) => {
  // Example logic based on specific keywords
  if (complaintText.includes('system down') || complaintText.includes('not working')) {
    return 'High';
  } else if (complaintText.includes('slow') || complaintText.includes('software issue')) {
    return 'Medium';
  } else {
    return 'Low';
  }
};

// GET /api/complaints - Fetch complaints based on user email or return all (admin case)
router.get('/', async (req, res) => {
  try {
    const { email } = req.query; // Extract email from query params

    // If email is provided, fetch complaints for that student only
    if (email) {
      const studentComplaints = await Complaint.find({ email });
      return res.status(200).json(studentComplaints);
    }

    // If no email is provided, return all complaints (admin case)
    const allComplaints = await Complaint.find().populate('assignedTechnician'); // Populate technician name
    res.status(200).json(allComplaints);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching complaints', error });
  }
});

// GET /api/complaints/:id - Fetch a single complaint by ID
router.get('/:id', async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id).populate('assignedTechnician');
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    res.status(200).json(complaint); // Send the complaint as JSON response
  } catch (error) {
    res.status(500).json({ message: 'Error fetching complaint', error });
  }
});



// POST /api/complaints - Create a new complaint with automatic severity
router.post('/', async (req, res) => {
  try {
    const { rollNo, email, lab, systemNumber, complaint } = req.body;

    // Automatically determine severity based on the complaint content
    const severity = determineSeverity(complaint);

    // Create a new complaint
    const newComplaint = new Complaint({
      rollNo,
      email,
      lab,
      systemNumber,
      complaint,
      severity,
      status: 'Complaint Raised',
    });

    // Save the new complaint to the database
    await newComplaint.save();

    // Respond with the newly created complaint
    res.status(201).json(newComplaint);
  } catch (error) {
    res.status(500).json({ message: 'Error creating complaint', error });
  }
});

// PUT /api/complaints/:id - Assign a technician to a complaint
router.put('/:id', async (req, res) => {
  const complaintId = req.params.id;
  const { assignedTechnician } = req.body; // technician ID should be passed in request body

  try {
    // Find the complaint by ID and update the assigned technician
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      complaintId,
      {
        assignedTechnician, // This expects the ID of the technician
        assignedAt: new Date() // Log assignment date/time
      },
      { new: true }
    ).populate('assignedTechnician'); // Populate technician details    

    if (!updatedComplaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.status(200).json(updatedComplaint); // Return updated complaint
  } catch (error) {
    res.status(500).json({ message: 'Error assigning technician', error });
  }
});


router.put('/status/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Find the complaint by ID and update its status
    const updatedComplaint = await Complaint.findByIdAndUpdate(id, { status }, { new: true });

    if (!updatedComplaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.json(updatedComplaint);
  } catch (error) {
    res.status(500).json({ message: 'Error updating complaint status', error });
  }
});


// DELETE /api/complaints/:id - Delete a complaint by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedComplaint = await Complaint.findByIdAndDelete(req.params.id); // Delete the complaint by ID
    if (!deletedComplaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    res.status(200).json({ message: 'Complaint deleted successfully' }); // Send confirmation of deletion
  } catch (error) {
    res.status(500).json({ message: 'Error deleting complaint', error });
  }
});

module.exports = router;
