module.exports = {
  content: ["./src/**/*.{html,js,ts}"],
  daisyui: {
    themes: [
      {
        xstheme: {
          primary: "#cc0000",
          secondary: "#4b5563",
          accent: "#e5e7eb",
          neutral: "#3D4451",
          "base-100": "#FFFFFF",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
      'dracula'
    ],
  },
  plugins: [require("daisyui")],
};
