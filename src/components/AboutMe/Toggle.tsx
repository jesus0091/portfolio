"use client";

import { useTheme } from "./ThemeController";

export default function ThemeToggleButton() {
  const { mounted, mode, quickToggle } = useTheme();

  if (!mounted) {
    return (
      <button
        type="button"
        className="px-3 py-2 rounded-full bg-gray-300 text-gray-600 cursor-wait"
      >
        …
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={quickToggle}
      className="px-3 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black transition"
    >
      {mode === "dark" ? "🌙 Dark" : mode === "light" ? "☀️ Light" : "🖥 System"}
    </button>
  );
}
