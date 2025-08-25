

import React, { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeContext } from "../contexts/ThemeContext";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = ({ onClose }) => {
  const { theme } = useContext(ThemeContext);
  const { logout, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  const handleLogin = () => {
    navigate("/signin");
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Background Overlay */}
        <div
          className="absolute inset-0 bg-black bg-opacity-40"
          onClick={onClose}
        />

        {/* Sidebar */}
        <motion.div
          className={`absolute right-0 top-0 h-full w-64 shadow-xl p-6 flex flex-col
            ${
              theme === "dark"
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-900"
            }
          `}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="self-end text-2xl mb-6 hover:text-red-500"
          >
            ✖
          </button>

          {/* Links */}
          <nav className="flex flex-col space-y-4">
            <Link to="/" onClick={onClose} className="hover:underline">
              Home
            </Link>

            {/* Show settings only if logged in */}
            {isAuthenticated && (
              <Link
                to="/settings"
                onClick={onClose}
                className="hover:underline"
              >
                Settings
              </Link>
            )}

            {/* Show Logout if logged in, otherwise Login */}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="mt-6 px-4 py-2 text-left border rounded-md hover:bg-red-500 hover:text-white transition"
              >
                🚪 Logout
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="mt-6 px-4 py-2 text-left border rounded-md hover:bg-green-500 hover:text-white transition"
              >
                🔑 Login
              </button>
            )}
          </nav>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Sidebar;
