const { Team, TeamMember, User } = require('../models');

//Create A Team
const createTeamHandler = async (req, res) => {
    try {
        const team = await Team.create({ name: req.body.name });
        await TeamMember.create({
            UserId: req.user.id,
            TeamId: team.id,
            role: 'admin',
        });
        res.status(201).json(team);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
  
//Invite a Member to a team
const inviteMemberHandler = async (req, res) => {
    const { userId } = req.body;
    const { teamId } = req.params;
    try {
        await TeamMember.create({
            UserId: userId,
            TeamId: teamId,
            role: 'member',
        });
        res.json({ message: 'User added to team' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    createTeamHandler,
    inviteMemberHandler
}