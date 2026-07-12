const mongoose = require('mongoose');

const craftsmanSchema = new mongoose.Schema({
  craftsmanId: {
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
    required: true
  },
  phone: String,
  email: String,
  photo: String,
  specialization: [String],
  yearsOfExperience: Number,
  expertise: String,
  salary: Number,
  salaryType: {
    type: String,
    enum: ['daily', 'monthly', 'piece-rate'],
    default: 'monthly'
  },
  piecerate: Number,
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalOrdersCompleted: {
    type: Number,
    default: 0
  },
  onTimeDeliveryRate: Number,
  qualityScore: Number,
  isActive: {
    type: Boolean,
    default: true
  },
  currentWorkload: {
    type: Number,
    default: 0
  },
  totalCapacity: {
    type: Number,
    default: 10
  },
  assignedOrders: [{
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    },
    status: String,
    assignedDate: Date,
    deadline: Date
  }],
  totalEarned: {
    type: Number,
    default: 0
  },
  totalAdvance: {
    type: Number,
    default: 0
  },
  totalDue: {
    type: Number,
    default: 0
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

// Generate craftsman ID
craftsmanSchema.pre('save', async function(next) {
  if (!this.craftsmanId) {
    const count = await mongoose.model('Craftsman').countDocuments();
    this.craftsmanId = `CRFT-${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Craftsman', craftsmanSchema);
