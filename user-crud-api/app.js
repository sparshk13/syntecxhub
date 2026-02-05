const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user.routes');
const morgan = require('morgan');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/users', userRoutes);

module.exports = app;