import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTeam } from '../features/team/teamSlice';
import { useNavigate } from 'react-router-dom';

function CreateTeam() {
  const [teamName, setTeamName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.team);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTeam({ name: teamName }));
    setTeamName('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Team</h2>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Creating Team...' : 'Create Team'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateTeam;