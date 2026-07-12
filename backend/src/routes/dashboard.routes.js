const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Customer = require('../models/Customer');
const Invoice = require('../models/Invoice');

// Get dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayOrders = await Order.countDocuments({
      createdAt: { $gte: today }
    });

    const todayDeliveries = await Order.countDocuments({
      status: 'delivered',
      actualDeliveryDate: { $gte: today }
    });

    const pendingOrders = await Order.countDocuments({
      status: { $ne: 'delivered', $ne: 'cancelled' }
    });

    const totalCustomers = await Customer.countDocuments();

    const invoices = await Invoice.find();
    const totalRevenue = invoices.reduce((sum, inv) => sum + (inv.total || 0), 0);
    const pendingPayments = invoices
      .filter(inv => inv.paymentStatus !== 'paid')
      .reduce((sum, inv) => sum + (inv.balance || 0), 0);

    res.json({
      todayOrders,
      todayDeliveries,
      pendingOrders,
      totalCustomers,
      totalRevenue,
      pendingPayments,
      advanceReceived: invoices.reduce((sum, inv) => sum + (inv.advance || 0), 0),
      balanceDue: pendingPayments
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get monthly sales
router.get('/sales', async (req, res) => {
  try {
    const period = req.query.period || 'weekly';
    const invoices = await Invoice.find();

    // Group by date
    const data = {};
    invoices.forEach(inv => {
      const date = new Date(inv.createdAt);
      const key = period === 'weekly' 
        ? date.toISOString().split('T')[0]
        : `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

      data[key] = (data[key] || 0) + (inv.total || 0);
    });

    const labels = Object.keys(data).sort();
    const values = labels.map(label => data[label]);

    res.json({
      labels,
      data: values
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
