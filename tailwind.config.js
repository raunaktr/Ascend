module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#0d288d",
          "primary-focus": "#020A43",
          "primary-content": "#FFFFFF",
          secondary: "#5680E9",
          "secondary-focus": "#2B47A7",
          "secondary-content": "#FFFFFF",
          accent: "#e45351",
          "accent-focus": "#84CEEB",
          "accent-content": "#FFFFFF",
          neutral: "#C1C8E4",
          "neutral-focus": "#2A2E37",
          "neutral-content": "#FFFFFF",
          "base-100": "#FFFFFF",
          "base-200": "#FBFFFC",
          "base-300": "#C7CBE4",
          "base-content": "#1F2937",
          info: "#A1C1F7",
          success: "#B4F3A3",
          warning: "#FCE197",
          error: "#F4B79F",
        },
      },
    ],
  },
};
