const dotenv = require('dotenv')
const express = require('express');
const cors = require('cors');
const User = require('../models/User');
const { sequelize } = require('../db');
const md = require('../models');
md.sequelize.sync({ alter: true });

const app = express();

dotenv.config();

// // Middleware
// const corsOptions = {
//     origin: 'http://localhost:3000', // Allow requests from the frontend
//     methods: 'GET,POST,PUT,DELETE', // Allow these HTTP methods
//     allowedHeaders: 'Content-Type,Authorization' // Allow these headers
//   };

//   //ROUTES
// app.use(cors(corsOptions));
app.use(express.json());

const authRoutes = require('../routes/auth');
app.use('/api/auth', authRoutes);

const protectedRoutes = require('../routes/protected');
app.use('/api/protected', protectedRoutes);

const teamRoutes = require('../routes/team');
app.use('/api/teams', teamRoutes);

const projectRoutes = require('../routes/project');
app.use('/api/projects', projectRoutes);

const taskRoutes = require('../routes/task');
app.use('/api', taskRoutes);

module.exports = app;