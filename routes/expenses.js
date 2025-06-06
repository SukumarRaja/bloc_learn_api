const express = require('express');
const Expense = require('../models/Expense');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all expenses for a user
router.get('/', auth, async (req, res) => {
  const expenses = await Expense.find({ user: req.userId }).sort({ createdAt: -1 });
  res.json(expenses);
});

// Add expense
router.post('/', auth, async (req, res) => {
  const { title, amount } = req.body;
  const expense = new Expense({ title, amount, user: req.userId });
  await expense.save();
  res.status(201).json(expense);
});

module.exports = router;
