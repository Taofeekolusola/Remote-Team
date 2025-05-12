const { Project, ProjectAssignment } = require('../models');

//Create a Project Under a tem
const createProjectHandler = async (req, res) => {
    const { name, description, teamId } = req.body;
    try {
        const project = await Project.create({ name, description, teamId });
        res.status(201).json(project);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
  
//Asign User To a project
const assignProjectHandler = async (req, res) => {
    const { userId, role } = req.body;
    try {
        await ProjectAssignment.create({
            ProjectId: req.params.projectId,
            UserId: userId,
            role: role || 'contributor',
        });
        res.json({ message: 'User assigned to project' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    createProjectHandler,
    assignProjectHandler
}