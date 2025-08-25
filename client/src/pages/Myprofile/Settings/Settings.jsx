import React, { useContext, useState } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [selectedTheme, setSelectedTheme] = useState(theme);
  const navigate = useNavigate();

  const handleThemeChange = (e) => {
    const chosenTheme = e.target.value;
    setSelectedTheme(chosenTheme);
    if (chosenTheme !== theme) {
      toggleTheme();
    }
  };

  return (
    <div
      className={`min-h-screen p-6 transition-colors duration-300
        ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}
      `}
    >
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 space-y-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-lg border border-gray-400 dark:border-gray-600 
                     hover:bg-gray-200 dark:hover:bg-gray-700 transition flex items-center space-x-2"
        >
          <span>⬅</span>
          <span>Back</span>
        </button>

        {/* Page Title */}
        <h1 className="text-2xl font-bold">Settings</h1>

        {/* User Preferences Section */}
        <section>
          <h2 className="text-lg font-semibold mb-4">User Preferences</h2>

          {/* Theme Dropdown */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-6">
            <label htmlFor="theme" className="mb-2 sm:mb-0 font-medium">
              Theme:
            </label>
            <select
              id="theme"
              value={selectedTheme}
              onChange={handleThemeChange}
              className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="light">☀️ Light</option>
              <option value="dark">🌙 Dark</option>
            </select>
          </div>
        </section>

        {/* Metrics Section (Beta) */}
        <section>
          <h2 className="text-lg font-semibold mb-2">
            Metrics <span className="text-xs font-medium text-blue-500">(Beta)</span>
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Choose your preferred unit for temperature.
          </p>
          <div className="flex space-x-4">
            <button className="px-3 py-1 rounded-md border dark:border-gray-600 opacity-50 cursor-not-allowed">
              °C Celsius
            </button>
            <button className="px-3 py-1 rounded-md border dark:border-gray-600 opacity-50 cursor-not-allowed">
              °F Fahrenheit
            </button>
          </div>
        </section>

        {/* Default City (Beta) */}
        <section>
          <h2 className="text-lg font-semibold mb-2">
            Default City <span className="text-xs font-medium text-blue-500">(Beta)</span>
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Set your default city for quick weather access.
          </p>
          <input
            type="text"
            placeholder="e.g. Bangalore"
            disabled
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 opacity-50 cursor-not-allowed"
          />
        </section>

        {/* Notifications (Beta) */}
        <section>
          <h2 className="text-lg font-semibold mb-2">
            Notifications <span className="text-xs font-medium text-blue-500">(Beta)</span>
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Get daily weather forecast reminders.
          </p>
          <label className="flex items-center space-x-2">
            <input type="checkbox" disabled className="opacity-50 cursor-not-allowed" />
            <span>Enable Notifications</span>
          </label>
        </section>
      </div>
    </div>
  );
};

export default Settings;
