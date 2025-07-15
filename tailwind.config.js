/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./Layouts/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
    },
    extend: {
      backgroundImage: {
        hero: "url('/assets/png/bg-image.png')",
        play: "url('/assets/png/leadership.png')",
      },
      colors: {
        buttonColor: "#28C24E",
        primary: "#0E0E0E",
        secondary: "#09005B",
        sectionBg: "#F2FBF4",
        bulletColor: "#868686",
        neutral: "#868686",
      },
    },
  },
  plugins: [],
};
