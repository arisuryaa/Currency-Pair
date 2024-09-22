/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#0A146E",
        secondary: "#006FE8",
        third: "#FAFAFB",
      },
      boxShadow: {
        lg: "3px 3px 0 rgba(0, 111, 232, 100)",
      },
      fontFamily: {
        Poppins: ["Poppins", "sans"],
      },
    },
  },
  plugins: [],
};
