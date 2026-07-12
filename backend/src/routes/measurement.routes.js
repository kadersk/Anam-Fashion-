const express = require('express');
const router = express.Router();
const Measurement = require('../models/Measurement');
const { body, validationResult } = require('express-validator');

// Get measurements
router.get('/:customerId', async (req, res) => {
  try {
    const measurements = await Measurement.find({ customerId: req.params.customerId })
      .sort({ createdAt: -1 });

    res.json(measurements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create measurement
router.post('/', [
  body('customerId').notEmpty(),
  body('measurements').isObject()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const measurement = new Measurement(req.body);
    await measurement.save();

    res.status(201).json(measurement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update measurement
router.put('/:id', async (req, res) => {
  try {
    const measurement = await Measurement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!measurement) {
      return res.status(404).json({ message: 'Measurement not found' });
    }

    res.json(measurement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
