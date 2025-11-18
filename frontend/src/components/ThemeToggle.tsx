import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Check localStorage and system preference
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
    // Also set class for Tailwind dark mode
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    // Also toggle class for Tailwind dark mode
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
      style={{
        background: 'var(--glass-bg)',
        border: '2px solid var(--glass-border)',
        backdropFilter: 'blur(10px)',
        boxShadow: 'var(--shadow-sm)',
      }}
      aria-label="테마 변경"
    >
      <span
        className="absolute text-2xl transition-all duration-300"
        style={{
          opacity: theme === 'light' ? 1 : 0,
          transform: theme === 'light' ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(180deg)',
        }}
      >
        ☀️
      </span>
      <span
        className="absolute text-2xl transition-all duration-300"
        style={{
          opacity: theme === 'dark' ? 1 : 0,
          transform: theme === 'dark' ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(180deg)',
        }}
      >
        🌙
      </span>
    </button>
  );
};

export default ThemeToggle;
