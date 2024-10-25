// server/models/Lab.js
const mongoose = require('mongoose');

const labSchema = new mongoose.Schema({
  labName: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  image: { // New field for the image
    type: String,
    required: true // Make it required if you want to ensure every lab has an image
  }
});

module.exports = mongoose.model('Lab', labSchema);
