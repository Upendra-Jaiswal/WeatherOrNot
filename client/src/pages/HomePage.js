import React, { useContext } from "react";
import Navbar from "./Navbar";
import { ThemeContext } from "../contexts/ThemeContext";
import Forecast from "../components/Forecast";

const HomePage = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`flex flex-col min-h-screen ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <Navbar />

      <main className="flex-1 p-6 space-y-6">
        <Forecast />
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 py-8 mt-12 shadow-inner">
        <div className="container mx-auto px-6 flex flex-col md:flex-row md:items-center md:justify-between">
          {/* App Name & Copyright */}
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-xl font-bold text-white tracking-wide">
              WeatherOrNot 🌤️
            </h2>
            <p className="text-sm mt-2">
              &copy; {new Date().getFullYear()} WeatherOrNot. All rights
              reserved.
            </p>
          </div>

          {/* Links */}
          <div className="flex justify-center md:justify-end space-x-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
