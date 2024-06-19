const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all houses, sorted by street name
router.get('/houses', (req, res) => {
    db.all('SELECT * FROM house ORDER BY street', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// Add a new house
router.post('/houses', (req, res) => {
    const { street, housenumber, postcode, town, url, latitude, longitude } = req.body;
    const sql = 'INSERT INTO house (street, housenumber, postcode, town, url, latitude, longitude) VALUES (?,?,?,?,?,?,?)';
    const params = [street, housenumber, postcode, town, url, latitude, longitude];

    db.run(sql, params, function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: { id: this.lastID, street, housenumber, postcode, town, url, latitude, longitude }
        });
    });
});

// Delete a house
router.delete('/houses/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM house WHERE id = ?', id, function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: 'deleted', changes: this.changes });
    });
});

module.exports = router;
