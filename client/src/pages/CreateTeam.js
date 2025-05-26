// src/pages/CreateTeam.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTeam } from '../features/team/teamSlice';
import { useNavigate } from 'react-router-dom';

function CreateTeam() {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, team } = useSelector((state) => state.team);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(createTeam({ name }));
    if (createTeam.fulfilled.match(resultAction)) {
      const newTeamId = resultAction.payload.id;
      navigate(`/teams/${newTeamId}/invite`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Create a Team</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          placeholder="Team Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Creating...' : 'Create Team'}
        </button>
      </form>
    </div>
  );
}

export default CreateTeam;