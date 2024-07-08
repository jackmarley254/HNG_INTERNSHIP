const express = require('express');
const authRoutes = require('./routes/authRoutes');
const orgRoutes = require('./routes/orgRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/api', orgRoutes);
app.use('/api', userRoutes);

module.exports = app;

