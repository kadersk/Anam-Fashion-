const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  customerId: {
    type: String,
    unique: true
  },
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Customer name is required']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required']
  },
  whatsapp: String,
  email: String,
  address: String,
  city: String,
  state: String,
  pinCode: String,
  birthday: Date,
  anniversary: Date,
  photo: String,
  notes: String,
  totalSpent: {
    type: Number,
    default: 0
  },
  orderCount: {
    type: Number,
    default: 0
  },
  isVIP: {
    type: Boolean,
    default: false
  },
  isRepeat: {
    type: Boolean,
    default: false
  },
  totalAdvance: {
    type: Number,
    default: 0
  },
  totalDue: {
    type: Number,
    default: 0
  },
  lastOrderDate: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Generate customer ID before saving
customerSchema.pre('save', async function(next) {
  if (!this.customerId) {
    const count = await mongoose.model('Customer').countDocuments();
    this.customerId = `CUST-${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Customer', customerSchema);
