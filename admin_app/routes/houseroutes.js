const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all houses, sorted by street name
router.get('/houses', (req, res) => {
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

// Get a specific house's details
router.get('/houses/:id', (req, res) => {
    const houseId = req.params.id;
    db.get('SELECT * FROM house WHERE id = ?', [houseId], (err, row) => {
        if (err) {
            console.error('Database error:', err.message); // Log error to console
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ message: 'House not found' });
        } else {
            res.json({
                message: 'success',
                data: row
            });
        }
    });
});

// Update house coordinates
router.put('/houses', (req, res) => {
    const updates = req.body.updates;
    const promises = updates.map(update => {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE house SET latitude = ?, longitude = ? WHERE id = ?';
            const params = [update.latitude, update.longitude, update.id];
            db.run(sql, params, function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    });

    Promise.all(promises)
        .then(() => res.json({ message: 'success' }))
        .catch(err => res.status(400).json({ error: err.message }));
});

module.exports = router;
