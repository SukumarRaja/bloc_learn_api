const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all expenses
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM expenses ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new expense
router.post('/', async (req, res) => {
  const { title, amount } = req.body;
  if (!title || !amount) {
    return res.status(400).json({ error: 'Title and amount are required' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO expenses (title, amount) VALUES (?, ?)',
      [title, amount]
    );
    res.json({ id: result.insertId, title, amount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
