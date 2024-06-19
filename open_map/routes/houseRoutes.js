const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all houses, sorted by street name
router.get('/', (req, res) => {
    db.all('SELECT * FROM house ORDER BY street', [], (err, rows) => {
        if (err) {
            console.error('Database error:', err.message); // Log error to console
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

module.exports = router;
