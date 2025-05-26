import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import CreateTeam from './pages/CreateTeam';
import InviteMember from './pages/InviteMember';
import AssignProject from './pages/AssignProject';
import CreateProject from './pages/CreateProject';
import BoardView from './pages/BoardView';
import Board from './pages/Board';
import Task from './pages/Task';
import Column from './pages/Column';
import BoardPage from './pages/BoardPage';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes with Layout */}
        <Route
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/teams/create" element={<CreateTeam />} />
          <Route path="/teams/:teamId/invite" element={<InviteMember />} />
          <Route path="/projects/:projectId/assign" element={<AssignProject />} />
          <Route path="/projects/create" element={<CreateProject />} />
          <Route path="/boards/:id" element={<BoardView />} />
          <Route path="/boards" element={<BoardPage />} />
          <Route path="/task/:columnId" element={<Task />} />
          <Route path="/column/:boardId" element={<Column />} />
          <Route path="/board/create/:projectId" element={<Board />} />
        </Route>

        {/* Default route */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;