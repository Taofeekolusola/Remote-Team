import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBoard } from '../features/board/boardSlice';
import { useParams } from 'react-router-dom';

const BoardForm = () => {
  const { projectId } = useParams();
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.board);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    dispatch(createBoard({ projectId, name }));
    setName('');
  };

  return (
    <div className="max-w-md mx-auto mt-6 bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Create Board</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Board Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Board'}
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {message && <p className="text-green-500 mt-2">{message}</p>}
    </div>
  );
};

export default BoardForm;