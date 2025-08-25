module.exports = {
   darkMode: "class", // ✅ important
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include your source files
  ],
  theme: {
    extend: {
      fontFamily: {
        cursive: ["Dancing Script", "cursive"], // Add the cursive font
      },
    },
  },
  plugins: [],
};
