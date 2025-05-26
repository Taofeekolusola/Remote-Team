// src/pages/InviteMember.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { inviteMember, resetInviteStatus } from '../features/team/teamSlice';
import { useParams } from 'react-router-dom';

function InviteMember() {
  const [userId, setUserId] = useState('');
  const { teamId } = useParams();
  const dispatch = useDispatch();
  const { inviteStatus, error } = useSelector((state) => state.team);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(inviteMember({ teamId, userId }));
    setUserId('');
  };

  useEffect(() => {
    return () => {
      dispatch(resetInviteStatus());
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Invite Member to Team {teamId}
        </h2>
        {inviteStatus === 'success' && (
          <p className="text-green-600 text-center mb-4">Member invited successfully!</p>
        )}
        {inviteStatus === 'failed' && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}
        <input
          type="number"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Invite
        </button>
      </form>
    </div>
  );
}

export default InviteMember;