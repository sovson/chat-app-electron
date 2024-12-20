import { LogOut, MessageCircle, MessageSquare, Search, User } from 'lucide-react';
import { useAuth } from '../context/auth-context';
import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import { useUserListContext } from '../context/user-list-context';
import { useState } from 'react';
import { mockUsers } from '../mock/data';

const Dashboard = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const { users } = useUserListContext();

  return (
    <div className="flex h-screen bg-base-200 text-base-content">
      <div className="bg-base-300 w-20 flex flex-col items-center space-y-4 py-4 shadow-lg rounded-l-lg">
        <button className="btn btn-circle btn-primary">
          <MessageSquare size={20} />
        </button>
        <button className="btn btn-circle btn-secondary">
          <User size={20} />
        </button>
        <button
          className="btn btn-circle btn-error mt-auto"
          onClick={handleLogout}
        >
          <LogOut size={20} />
        </button>
      </div>

      <div className="flex flex-col w-72 bg-base-300 p-4 shadow-lg rounded-r-lg">
        <div className="relative mb-4">
          <Search size={18} className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            className="input input-bordered w-full pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <h3 className="text-lg font-semibold mb-2 text-primary">Active Users</h3>
        <ul className="overflow-y-auto flex-1 space-y-2">
          {users.map((user) => (
            <li
              key={user.userID}
              className={`relative flex items-center space-x-3 rounded-lg p-3 cursor-pointer transition-all ${
                location.pathname === `/chat/${user.userID}`
                  ? "bg-primary text-white"
                  : "bg-base-100 hover:bg-base-200"
              }`}
            >
              <img
                className="w-10 h-10 rounded-full"
                src={`https://ui-avatars.com/api/?name=${user.username.replace(/ /g, "+")}`}
                alt={user.username}
              />
              <span className="font-medium">{user.username}</span>
              <Link
                className="absolute inset-0"
                to={`/chat/${user.userID}`}
                aria-label={`Open chat with ${user.username}`}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="bg-base-300 py-4 px-6 flex items-center justify-between shadow-lg rounded-b-lg">
          <h1 className="text-2xl font-bold text-primary">
            {location.pathname.startsWith("/chat/") 
              ? `Chat with ${
                  mockUsers.find(
                    (user) => `/chat/${user.userID}` === location.pathname
                  )?.username || "Unknown"
                }`
              : "General Chat"}
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-base-200">
          {location.pathname === "/" ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 text-center">
                Select a user from the sidebar to start chatting.
              </p>
            </div>
          ) : (
            <Outlet />
          )}
        </div>

        <div className="p-4 bg-base-300 rounded-t-lg shadow-lg">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              placeholder="Type a message..."
              className="input input-bordered flex-1"
            />
            <button className="btn btn-primary btn-circle">
              <MessageSquare size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
