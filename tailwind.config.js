/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        item: "auto 1fr auto",
      },
      gridTemplateRows: {
        preview: "auto 1fr",
      },
      aspectRatio: {
        "8/11": "8/11",
      },
    },
  },
  plugins: [],
};
