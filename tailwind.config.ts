import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [
    require('@tailwindcss/typography')
  ],
  variants: {
      extend: {
          display: ["group-hover"],
      },
  },
} satisfies Config;
