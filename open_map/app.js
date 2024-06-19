const express = require('express');
const path = require('path');
const houseRoutes = require('./routes/houseRoutes');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/houses', houseRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
