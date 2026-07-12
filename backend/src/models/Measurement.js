const mongoose = require('mongoose');

const measurementSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  measurements: {
    bust: Number,
    upperBust: Number,
    waist: Number,
    hip: Number,
    shoulder: Number,
    neck: Number,
    frontNeckDepth: Number,
    backNeckDepth: Number,
    armhole: Number,
    sleeveLength: Number,
    sleeveRound: Number,
    biceps: Number,
    elbow: Number,
    wrist: Number,
    blouseLength: Number,
    frontLength: Number,
    backLength: Number,
    princessCut: Number,
    cupSize: String
  },
  options: {
    paddingRequired: Boolean,
    liningRequired: Boolean,
    doriRequired: Boolean,
    tassels: Boolean,
    fall: Boolean,
    pico: Boolean
  },
  notes: String,
  fabricNotes: String,
  embroideryNotes: String,
  stoneWorkNotes: String,
  customMeasurements: {},
  version: {
    type: Number,
    default: 1
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Measurement', measurementSchema);
