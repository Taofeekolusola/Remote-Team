import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  fetchBoardById,
  addColumn,
  addTask,
  moveTask,
  deleteTask,
} from '../features/board/boardSlice';

const BoardPage = () => {
  const { boardId } = useParams();
  const dispatch = useDispatch();
  const { board, loading, message } = useSelector((state) => state.board);

  const [columnName, setColumnName] = useState('');
  const [taskData, setTaskData] = useState({
    columnId: '',
    title: '',
    description: '',
    dueDate: '',
  });

  useEffect(() => {
    dispatch(fetchBoardById(boardId));
  }, [dispatch, boardId]);

  const handleAddTask = () => {
    const { columnId, title, description, dueDate } = taskData;
    if (columnId && title) {
      dispatch(addTask({ columnId, title, description, dueDate }));
      setTaskData({ columnId: '', title: '', description: '', dueDate: '' });
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Board: {board?.name}</h1>

      {/* Task Input */}
      <div className="mb-10 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          className="px-4 py-2 border border-gray-300 rounded-md"
          value={taskData.columnId}
          onChange={(e) => setTaskData({ ...taskData, columnId: e.target.value })}
          placeholder="Column ID"
        />
        <input
          className="px-4 py-2 border border-gray-300 rounded-md"
          value={taskData.title}
          onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
          placeholder="Task title"
        />
        <input
          className="px-4 py-2 border border-gray-300 rounded-md"
          value={taskData.description}
          onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
          placeholder="Task description"
        />
        <input
          type="date"
          className="px-4 py-2 border border-gray-300 rounded-md"
          value={taskData.dueDate}
          onChange={(e) => setTaskData({ ...taskData, dueDate: e.target.value })}
        />
        <button
          onClick={handleAddTask}
          className="md:col-span-4 w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Add Task
        </button>
      </div>

      {/* Columns and Tasks */}
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {board?.columns?.map((col) => (
            <div key={col.id} className="bg-white p-4 shadow rounded-md">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">{col.name}</h3>
              <ul className="space-y-4">
                {col.tasks?.map((task) => (
                  <li key={task.id} className="bg-gray-100 p-3 rounded-md">
                    <p className="font-bold text-gray-800">{task.title}</p>
                    <p className="text-sm text-gray-600">{task.description}</p>
                    <p className="text-xs text-gray-500 mt-1">Due: {task.dueDate}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {message && <p className="mt-6 text-green-600 font-medium">{message}</p>}
    </div>
  );
};

export default BoardPage;