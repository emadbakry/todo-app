/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      clr_check: "linear-gradient hsl(192, 100%, 67%) to hsl(280, 87%, 65%)",
      clr_bright_blue: "hsl(220, 98%, 61%)",
      clr_gray_1: "hsl(0, 0%, 98%)",
      clr_blue_1: "hsl(236, 33%, 92%)",
      clr_blue_2: "hsl(237, 14%, 26%)",
      clr_blue_3: "hsl(235, 21%, 11%)",
      clr_graish_blue_1: "hsl(234, 39%, 85%)",
      clr_graish_blue_2: "hsl(233, 11%, 84%)",
      clr_graish_blue_3: "hsl(236, 9%, 61%)",
      clr_graish_blue_4: "hsl(235, 19%, 35%)",
      clr_graish_blue_5: "hsl(234, 11%, 52%)",
      white: "#ffffff",
    },
  },
  plugins: [],
};
