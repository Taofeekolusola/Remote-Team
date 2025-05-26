import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addColumn } from '../features/board/boardSlice';
import { useParams } from 'react-router-dom';

const Column = () => {
  const { boardId } = useParams();
  const [name, setName] = useState('');
  const [order, setOrder] = useState(1);
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.board);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    dispatch(addColumn({ boardId, name, order }));
    setName('');
    setOrder(1);
  };

  return (
    <div className="mt-4 p-4 border rounded bg-white shadow">
      <h3 className="text-lg font-semibold mb-2">Add Column</h3>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          placeholder="Column Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          value={order}
          onChange={(e) => setOrder(Number(e.target.value))}
          min={1}
          className="border p-2 rounded w-full"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Adding...' : 'Add Column'}
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {message && <p className="text-green-500 mt-2">{message}</p>}
    </div>
  );
};

export default Column;