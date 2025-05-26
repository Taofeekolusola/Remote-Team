import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBoardById } from '../features/board/boardSlice';
import { useParams } from 'react-router-dom';

const BoardView = () => {
  const { id } = useParams(); // URL param e.g. /boards/1
  const dispatch = useDispatch();

  const { board, loading, error } = useSelector((state) => state.board);

  useEffect(() => {
    if (id) {
      dispatch(fetchBoardById(id));
    }
  }, [dispatch, id]);

  if (loading) return <p>Loading board...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!board) return <p>No board found.</p>;

  return (
    <div>
      <h2>{board.name}</h2>
      <div style={{ display: 'flex', gap: '2rem' }}>
        {board.TaskColumns.map((column) => (
          <div key={column.id} style={{ border: '1px solid #ccc', padding: '1rem', minWidth: '250px' }}>
            <h4>{column.name}</h4>
            <ul>
              {column.Tasks.map((task) => (
                <li key={task.id}>
                  <strong>{task.title}</strong>
                  <p>{task.description}</p>
                  <small>Due: {new Date(task.dueDate).toLocaleDateString()}</small>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardView;
