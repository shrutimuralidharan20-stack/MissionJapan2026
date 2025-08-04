// path: tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#2563eb" } // blue-600
      }
    }
  },
  plugins: []
};
