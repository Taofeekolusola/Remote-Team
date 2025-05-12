const { DataTypes } = require('sequelize');
const {sequelize} = require('../db');
const Team = require('./Team');

const Project = sequelize.define('Project', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.TEXT,
});

Project.belongsTo(Team, { foreignKey: 'teamId' });

module.exports = Project;
