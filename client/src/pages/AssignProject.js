import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  assignUserToProject,
  clearProjectMessage,
} from '../features/project/projectSlice';

const AssignProject = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    userId: '',
    role: 'contributor',
  });

  const { loading, message, error } = useSelector((state) => state.project);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(assignUserToProject({ projectId, ...formData }));
    setFormData({ userId: '', role: 'contributor' });
  };

  useEffect(() => {
    return () => {
      dispatch(clearProjectMessage());
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Assign Member to Project
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            name="userId"
            placeholder="User ID"
            value={formData.userId}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="manager">Manager</option>
            <option value="contributor">Contributor</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-200 disabled:opacity-50"
          >
            {loading ? 'Assigning...' : 'Assign User'}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-green-600 text-sm text-center">{message}</p>
        )}
        {error && (
          <p className="mt-4 text-red-600 text-sm text-center">{error}</p>
        )}
      </div>
    </div>
  );
};

export default AssignProject;