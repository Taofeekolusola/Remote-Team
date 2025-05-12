const { sequelize } = require('../db');
const User = require('./User');
const Team = require('./Team');
const TeamMember = require('./TeamMember');
const Project = require('./Project');
const ProjectAssignment = require('./ProjectAssignment');
const Board = require('./Board');
const TaskColumn = require('./TaskColumn');
const Task = require('./Task')

// Team ↔ Users (many-to-many)
User.belongsToMany(Team, { through: TeamMember });
Team.belongsToMany(User, { through: TeamMember });

// Team → Projects
Team.hasMany(Project);
Project.belongsTo(Team);

//Board -> Projecr
Project.hasMany(Board);
Board.belongsTo(Project);

//Board -> TaskColumn
Board.hasMany(TaskColumn);
TaskColumn.belongsTo(Board);

// Task belongs to column
TaskColumn.hasMany(Task);
Task.belongsTo(TaskColumn);

// Task can be assigned to multiple users
Task.belongsToMany(User, { through: 'TaskAssignees' });
User.belongsToMany(Task, { through: 'TaskAssignees' });

// Project ↔ Users (many-to-many)
User.belongsToMany(Project, { through: ProjectAssignment });
Project.belongsToMany(User, { through: ProjectAssignment });

module.exports = {
    sequelize,
    User,
    Team,
    TeamMember,
    Project,
    ProjectAssignment,
    Task,
    TaskColumn,
    Board,
};