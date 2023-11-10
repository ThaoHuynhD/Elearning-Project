/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  mode: "jit",
  theme: {
    extend: {
      maxWidth: {
        "150": "150px",
        "300": "500px",
      },
      maxHeight: {
        "100": "100px",
      }
    },
  },
  plugins: [],
};
