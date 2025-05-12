const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const TaskColumn = sequelize.define('TaskColumn', {
  name: {
    type: DataTypes.ENUM('To Do', 'In Progress', 'Done'),
    allowNull: false,
  },
  order: DataTypes.INTEGER,
});

module.exports = TaskColumn;
