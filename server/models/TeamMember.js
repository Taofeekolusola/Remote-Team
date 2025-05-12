const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const TeamMember = sequelize.define('TeamMember', {
  role: {
    type: DataTypes.ENUM('admin', 'member'),
    defaultValue: 'member',
  }
});

module.exports = TeamMember;
