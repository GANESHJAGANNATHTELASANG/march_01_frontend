import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/ContextProvider";

const Navbar = ({ setQuery }) => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="text-2xl font-bold text-blue-400">Note_App</div>

      {/* Search Bar */}
      <div className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
        <input
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search notes..."
          className="w-full px-4 py-2 rounded-lg text-black outline-none"
        />
      </div>

      {/* Buttons */}

      <div className="flex gap-4">
        {!user ? (
          <>
            <button
              type="button"
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg"
            >
              <Link to="/login"> Login </Link>
            </button>
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
            >
              <Link to="/register"> Sign up </Link>
            </button>
          </>
        ) : (
          <>
            <button className="  px-4 py-2 rounded-lg">{user.name}</button>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
            >
              Login out
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
