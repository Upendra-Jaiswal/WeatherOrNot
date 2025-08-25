

// src/contexts/ThemeContext.js
import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const loadTheme = async () => {
      try {
        if (token) {
          // ✅ Logged in → fetch from backend
          const res = await fetch(`${backendUrl}/api/preferences/theme`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.ok) {
            const data = await res.json();
            if (data.theme) {
              setTheme(data.theme);
              document.documentElement.classList.add(data.theme);
            //  localStorage.setItem("theme", data.theme); // cache locally
              return;
            }
          }
        }

        // ✅ Not logged in OR backend failed → use localStorage
        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme);

        document.documentElement.classList.add(savedTheme);
      } catch (err) {
        console.error("Failed to load theme:", err);
        setTheme("light");
        document.documentElement.classList.add("light");
      }
    };

    loadTheme();
  }, [token, backendUrl]);

  // ✅ Toggle theme (works for both logged-in & guest)
  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";

    // Remove old theme class and apply new one
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
    setTheme(newTheme);

    // Always store in localStorage
    localStorage.setItem("theme", newTheme);

    // If logged in → also update backend
    if (token) {
      try {
        const res = await fetch(`${backendUrl}/api/preferences/theme`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ theme: newTheme }),
        });

        const data = await res.json();

        if (res.ok) setMessage("Theme updated successfully!");
        else setMessage(data.message || "Error updating theme");
      } catch (error) {
        console.error(error);
        setMessage("Server error");
      }
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme,setTheme, message }}>
      {children}
    </ThemeContext.Provider>
  );
};
