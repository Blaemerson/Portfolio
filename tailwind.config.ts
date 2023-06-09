import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [
    require('@tailwindcss/typography')
  ],
  darkMode: 'class',
} satisfies Config;
