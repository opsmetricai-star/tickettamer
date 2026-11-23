import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0b",
        soft: "#f4f4f5",
        brand: { 50: "#eef2ff", 100: "#dfe6ff", 200: "#b9c7fb", 300: "#94a8f5", 400: "#7a8cee", 500: "#5f6fe0", 600: "#4a58c4" },
        mint: "#8fe3cf",
      },
      fontFamily: { sans: ["var(--font-sans)", "Arial", "sans-serif"] },
      boxShadow: { card: "0 1px 2px rgba(10,10,11,.04), 0 8px 30px rgba(10,10,11,.06)", pop: "0 20px 60px rgba(30,30,80,.18)" },
      letterSpacing: { tightest: "-0.045em" },
    },
  },
  plugins: [],
} satisfies Config;
