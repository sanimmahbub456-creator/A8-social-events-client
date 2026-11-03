"use client";

import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "@/providers/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle light / dark theme"
      className="btn btn-ghost btn-circle"
    >
      {theme === "communityLight" ? <FiMoon size={20} /> : <FiSun size={20} />}
    </button>
  );
}
