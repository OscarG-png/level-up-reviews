/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customPurple: '#8B3C7F',
      },
    },
  },
  plugins: [require("flowbite/plugin")],

  darkMode: 'class',
};
