import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTeams } from '../features/team/teamSlice';

function TeamList() {
  const dispatch = useDispatch();
  const { teams, loading, error } = useSelector((state) => state.team);

  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold text-center mb-6">Your Teams</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="space-y-4">
        {teams.map((team) => (
          <div key={team.id} className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">{team.name}</h3>
            {/* Add actions like Invite Member or View Details */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamList;