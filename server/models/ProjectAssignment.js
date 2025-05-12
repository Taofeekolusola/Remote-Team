const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const ProjectAssignment = sequelize.define('ProjectAssignment', {
  role: {
    type: DataTypes.ENUM('contributor', 'manager'),
    defaultValue: 'contributor',
  }
});

module.exports = ProjectAssignment;