"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only show the toggle after client-side hydration completes
  useEffect(() => {
    setMounted(true);
  }, []);

  // Show a placeholder of the same size during SSR
  if (!mounted) {
    return (
      <div className="w-9 h-9 flex items-center justify-center rounded-full border">
        <div className="invisible">
          <Sun size={18} />
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="w-9 h-9 flex items-center justify-center rounded-full border hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      aria-label={resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}