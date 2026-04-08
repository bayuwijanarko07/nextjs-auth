"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && (theme === 'dark' || resolvedTheme === 'dark');

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <div className="fixed top-6 right-6 p-3 w-[50px] h-[50px] rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg border border-gray-200/50 dark:border-gray-700/50 z-50"></div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="fixed cursor-pointer top-6 right-6 p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:scale-110 active:scale-95 transition-all duration-300 z-50 text-amber-500 dark:text-blue-400 group overflow-hidden"
      aria-label="Alihkan Mode Gelap"
    >
      <div className="relative w-6 h-6">
        <Icon
          icon="lucide:sun"
          className={`absolute inset-0 w-6 h-6 transition-all duration-500 transform ${isDark ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`}
        />
        <Icon
          icon="lucide:moon"
          className={`absolute inset-0 w-6 h-6 transition-all duration-500 transform ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`}
        />
      </div>
    </button>
  );
}
