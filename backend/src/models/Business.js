const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: String,
  phone: String,
  address: String,
  city: String,
  state: String,
  pinCode: String,
  gst: String,
  license: String,
  logo: String,
  website: String,
  currency: {
    type: String,
    default: 'INR'
  },
  language: {
    type: String,
    default: 'en'
  },
  timezone: String,
  theme: {
    type: String,
    enum: ['light', 'dark'],
    default: 'light'
  },
  invoiceTemplate: String,
  smsProvider: String,
  emailProvider: String,
  plan: {
    type: String,
    enum: ['free', 'professional', 'enterprise'],
    default: 'professional'
  },
  subscriptionEndDate: Date,
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

module.exports = mongoose.model('Business', businessSchema);
