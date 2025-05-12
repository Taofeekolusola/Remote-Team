const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Team = sequelize.define('Team', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Team;
