// server/routes/labs.js
const express = require('express');
const router = express.Router();
const Lab = require('../models/Lab'); // Assuming you have a Lab model

// POST route to add a new lab
router.post('/add', async (req, res) => {
  try {
    const newLab = new Lab({
      labName: req.body.labName,
      description: req.body.description
    });
    await newLab.save();
    res.status(201).json({ message: 'Lab added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add lab', error });
  }
});

router.get('/', async (req, res) => {
    try {
      const labs = await Lab.find(); // Fetch all labs from the database
      res.status(200).json(labs);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch labs', error });
    }
  });

  router.put('/edit/:id', async (req, res) => {
    try {
      const updatedLab = await Lab.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedLab) return res.status(404).json({ message: 'Lab not found' });
      res.status(200).json(updatedLab);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update lab', error });
    }
  });

module.exports = router;
