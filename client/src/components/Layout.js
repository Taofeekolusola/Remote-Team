import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const navLinks = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/teams/create', label: 'Create Team' },
  { path: '/projects/create', label: 'Create Project' },
  { path: '/boards', label: 'Boards' },
  { path: '/board/create/1', label: 'Create Board ' }, // Example projectId = 1
  { path: '/teams/1/invite', label: 'Invite Member ' }, // Example teamId = 1
  { path: '/projects/1/assign', label: 'Assign Project ' }, // Example projectId = 1
  { path: '/boards/1', label: 'Board View ' }, // Example boardId = 1
  { path: '/column/1', label: 'Column View ' }, // Example boardId = 1
  { path: '/task/1', label: 'Task View ' }, // Example columnId = 1
];

const Layout = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex-shrink-0">
        <div className="p-4 text-2xl font-bold border-b border-gray-700">My App</div>
        <nav className="mt-4 flex flex-col gap-2 px-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded hover:bg-gray-700 ${
                location.pathname === link.path ? 'bg-gray-700' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
            <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
          </div>
        </header>

        {/* Main Section */}
        <main className="flex-1 p-6 overflow-y-auto bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;