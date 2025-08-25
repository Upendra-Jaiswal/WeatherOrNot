import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
//import loginanimation from "./loginanimation.gif";
import loginanimation from "../assets/loginanimation.gif";
import { AuthContext } from "../contexts/AuthContext"; // adjust path as needed
import { ThemeContext } from "../contexts/ThemeContext";

// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // ✅ get login from context
  const { setTheme } = useContext(ThemeContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL;

      const response = await fetch(`${backendUrl}/api/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const result = await response.json();

        // ✅ use AuthContext instead of direct localStorage
        login(result.token);

        const prefRes = await fetch(`${backendUrl}/api/preferences/theme`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${result.token}`,
          },
        });

        if (prefRes.ok) {
          const prefData = await prefRes.json();
          if (prefData.theme) {
            setTheme(prefData.theme); // 🔥 apply immediately
            document.documentElement.classList.remove("light", "dark");
            document.documentElement.classList.add(prefData.theme);
          }
        }

        // toast.success("Signed in successfully!");
        navigate("/");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "An error occurred");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white text-gray-100 flex-col-reverse sm:flex-row">
      <div className="w-full max-w-md p-8 bg-white-800 shadow-xl rounded-lg flex flex-col space-y-6 sm:w-3/4 md:w-1/2 lg:w-1/3">
        {/* Sign In Section */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl text-black font-bold mb-4 m-4">Sign In</h2>
          <span className="text-sm bg-green-200 p-4 rounded-2xl text-black">
            <Link to="/">Homepage</Link>
          </span>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm text-black font-medium"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm text-black font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black sm:text-sm"
              required
            />
          </div>

          <button className="rounded-2xl border-2 border-dashed border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none">
            Sign In
          </button>
        </form>
        <p className="mt-4 text-black text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>

      {/* Second Section (Image) */}
      <div className="h-[200px] w-[250px] sm:h-[300px] sm:w-[350px] md:h-[400px] md:w-[500px] lg:h-[400px] lg:w-[500px] ml-8 mt-8 sm:mt-4 sm:ml-0 sm:p-8 sm:block">
        <img
          src={loginanimation}
          alt="animation"
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
    </div>
  );
};

export default SignIn;
