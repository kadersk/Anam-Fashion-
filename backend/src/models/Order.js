const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true
  },
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
  orderDate: {
    type: Date,
    default: Date.now
  },
  deliveryDate: {
    type: Date,
    required: true
  },
  actualDeliveryDate: Date,
  status: {
    type: String,
    enum: ['pending', 'cutting', 'embroidery', 'stitching', 'finishing', 'ironing', 'ready', 'delivered', 'cancelled'],
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  urgent: {
    type: Boolean,
    default: false
  },
  measurements: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Measurement'
  },
  referencePhotos: [String],
  voiceInstructions: [{
    url: String,
    duration: Number,
    uploadedAt: Date,
    transcription: String
  }],
  writtenInstructions: String,
  assignedTo: [{
    craftsmanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Craftsman'
    },
    assignedDate: Date,
    status: String,
    completionPercentage: Number,
    workPhotos: [String],
    workVideos: [String],
    notes: String
  }],
  totalAmount: Number,
  advance: Number,
  balance: Number,
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'partial', 'paid'],
    default: 'unpaid'
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

// Generate order number
orderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const count = await mongoose.model('Order').countDocuments();
    const date = new Date().getFullYear();
    this.orderNumber = `ORD-${date}-${String(count + 1).padStart(5, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
