const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./houses.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS house (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        street VARCHAR(200) NOT NULL,
        housenumber VARCHAR(20),
        postcode VARCHAR(20) NOT NULL,
        town VARCHAR(100) NOT NULL,
        url VARCHAR(300),
        latitude FLOAT,
        longitude FLOAT
    )`);
});

module.exports = db;
