const express = require('express');
const cors = require('cors');
require('dotenv').config();
const PORT =process.env.PORT || 5000;
const db = require('./db.js');
const userrouter = require('./user.route');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', userrouter);

app.get('/', (req, res) => {
    res.send('Welcome');
});

app.listen(PORT, () => {
    console.log(`Server connected to port ${PORT}`);
});
