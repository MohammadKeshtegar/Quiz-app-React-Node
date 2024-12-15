/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "custom-1": "0 0 30px -15px rgba(0, 0, 0, 0.5)",
        "custom-2": "0 0 35px -15px rgba(0, 0, 0, 0.75)",
        "custom-3": "0 0 35px -15px rgba(0, 0, 0, 1)",
      },
    },
  },
  plugins: [],
  darkMode: "selector",
  // darkMode: ["selector", '[data-mode="dark"]'],
};
