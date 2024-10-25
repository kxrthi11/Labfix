const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  rollNo: String,
  email: String,
  lab: String,
  systemNumber: String,
  complaint: String,
  severity: { type: String, default: 'Low' },
  status: { type: String, default: 'Complaint Raised' },
  assignedTechnician: { type: mongoose.Schema.Types.ObjectId, ref: 'Technician' }, // Reference to the Technician model
  assignedAt: Date,
  createdAt: { type: Date, default: Date.now }
});


const Complaint = mongoose.model('Complaint', ComplaintSchema);

module.exports = Complaint;
