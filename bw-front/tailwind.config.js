/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      main: ['Monomaniac One'],
      ibm: ['IBM Plex Mono'],
      nico: ['Nico Moji']
    },
    extend: {
      colors: {
        mainGray: "rgba(255, 255, 255, 0.30)",
        bgGray: "#1A1A1B",
        btnGray: "#282828",
        mainYellow: "rgba(255, 215, 0, 0.87)",
        graySeventy: "rgba(255, 255, 255, 0.70)"
      }
    },
  },
  plugins: [],
}