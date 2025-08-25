import { useState, useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext"; // import context
import { AuthContext } from "../contexts/AuthContext";

function Forecast() {
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { theme } = useContext(ThemeContext); // get theme ("light" | "dark")
  const { logout } = useContext(AuthContext);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setForecast(null);

    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${backendUrl}/api/${city}`);

      if (response.ok) {
        const data = await response.json();
        setForecast(data);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "An error occurred");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen p-6 transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-blue-100 text-black"
      }`}
    >
      <h1 className="text-3xl font-bold text-center mb-6">
        🌤 Weather Dashboard
      </h1>

      {/* Search Box */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className={`border p-2 rounded-l-lg w-64 ${
            theme === "dark"
              ? "bg-gray-800 text-white border-gray-600"
              : "bg-white text-black border-gray-300"
          }`}
        />
        <button
          onClick={handleSearch}
          className={`px-4 rounded-r-lg transition-colors duration-200 ${
            theme === "dark"
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          Search
        </button>
      </div>

      {/* Loading / Error */}
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {/* write code to have two navigation... weather info of cuurent input and second navigation for favorite cities */}
      {/* Weather Display */}
      {forecast && (
        <div
          className={`max-w-md mx-auto rounded-xl shadow-md p-4 transition-colors duration-300 ${
            theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
          }`}
        >
          {/* <button className="bg-green-400 p-2 ml-60 rounded-xl shadow-xl hover:shadow-md">
            + Add Preferences
          </button> */}
          <h2 className="text-xl font-semibold mb-2">
            {forecast.location.name}, {forecast.location.country}
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            🌡 {forecast.current.temp_c}°C - {forecast.current.condition.text}
          </p>

          <h3 className="mt-4 font-bold">5-Day Forecast</h3>
          <ul className="text-gray-600 dark:text-gray-300">
            {forecast.forecast.forecastday.map((day, i) => (
              <li key={i} className="mt-1">
                {day.date}: {day.day.avgtemp_c}°C - {day.day.condition.text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Forecast;
