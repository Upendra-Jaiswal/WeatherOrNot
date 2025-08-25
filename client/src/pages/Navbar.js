// src/components/Navbar.js
import React, { useState, useContext } from "react";
import Sidebar from "./Sidebar";
import { ThemeContext } from "../contexts/ThemeContext";

const Navbar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);




  return (
    <div
      className={`p-4 flex items-center justify-between transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-blue-600 text-white"
      }`}
    >
      {/* Logo */}
      <div className="text-lg font-bold">WeatherOrNot</div>

     
      {/* Right Side (theme toggle + hamburger) */}
      <div className="flex items-center space-x-4">
        {/* 🌙/☀️ Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="px-3 py-1 rounded-lg border border-white hover:bg-white hover:text-black transition"
        >
          {theme === "light" ? "☀️ Light " : " 🌙 Dark "}
        </button>

        {/* 🍔 Hamburger Toggle */}
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="focus:outline-none"
        >
          {isSidebarOpen ? (
            // Close (X)
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          ) : (
            // Hamburger (☰)
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          )}
        </button>
      </div>

      {isSidebarOpen && <Sidebar onClose={() => setSidebarOpen(false)} />}
    </div>
  );
};

export default Navbar;
