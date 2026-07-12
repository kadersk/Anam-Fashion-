const express = require('express');
const router = express.Router();
const Craftsman = require('../models/Craftsman');
const { body, validationResult } = require('express-validator');

// Get all craftsmen
router.get('/', async (req, res) => {
  try {
    const craftsmen = await Craftsman.find({ isActive: true })
      .sort({ createdAt: -1 });

    res.json(craftsmen);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single craftsman
router.get('/:id', async (req, res) => {
  try {
    const craftsman = await Craftsman.findById(req.params.id);

    if (!craftsman) {
      return res.status(404).json({ message: 'Craftsman not found' });
    }

    res.json(craftsman);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create craftsman
router.post('/', [
  body('name').notEmpty(),
  body('phone').notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const craftsman = new Craftsman(req.body);
    await craftsman.save();

    res.status(201).json(craftsman);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update craftsman
router.put('/:id', async (req, res) => {
  try {
    const craftsman = await Craftsman.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!craftsman) {
      return res.status(404).json({ message: 'Craftsman not found' });
    }

    res.json(craftsman);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
