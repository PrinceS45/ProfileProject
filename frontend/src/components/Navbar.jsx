// src/components/Navbar.jsx
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../store/useAuth"; // Adjust the import path as needed

const Navbar = () => {
  const { user, loading, checkAuth, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const renderAuthLinks = () => {
    if (loading) {
      return (
        <div className="h-8 w-32 bg-gray-200 rounded-md animate-pulse"></div>
      );
    }

    if (user) {
      return (
        <div className="flex items-center gap-4">
          <span className="text-gray-600 hidden sm:block">
            Welcome, {user.fullName}!
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <Link
          to="/login"
          className="text-gray-700 font-semibold py-2 px-4 rounded-md hover:bg-gray-100 transition-colors"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Sign Up
        </Link>
      </div>
    );
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-gray-800">
              DevProfiles
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/yourProfile"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Profile
              </Link>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="ml-4 flex items-center md:ml-6">
            {renderAuthLinks()}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
