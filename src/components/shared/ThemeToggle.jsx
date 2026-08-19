import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

const storageKey = 'mediqueue-theme';

const getCurrentTheme = () =>
  document.documentElement.classList.contains('dark')
    ? 'dark'
    : 'light';

const applyTheme = (theme) => {
  document.documentElement.classList.toggle(
    'dark',
    theme === 'dark'
  );
};

function ThemeToggle() {
  const [theme, setTheme] = useState(getCurrentTheme);

  useEffect(() => {
    const systemTheme = window.matchMedia(
      '(prefers-color-scheme: dark)'
    );

    const handleSystemThemeChange = (event) => {
      if (localStorage.getItem(storageKey)) return;

      const nextTheme = event.matches ? 'dark' : 'light';

      applyTheme(nextTheme);
      setTheme(nextTheme);
    };

    systemTheme.addEventListener('change', handleSystemThemeChange);

    return () => {
      systemTheme.removeEventListener(
        'change',
        handleSystemThemeChange
      );
    };
  }, []);

  const handleThemeChange = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    applyTheme(nextTheme);
    localStorage.setItem(storageKey, nextTheme);
    setTheme(nextTheme);
  };

  const label =
    theme === 'dark'
      ? 'Switch to light theme'
      : 'Switch to dark theme';

  return (
    <button
      aria-label={label}
      aria-pressed={theme === 'dark'}
      className="flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-500 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
      onClick={handleThemeChange}
      title={label}
      type="button"
    >
      {theme === 'dark' ? (
        <Sun aria-hidden="true" size={19} />
      ) : (
        <Moon aria-hidden="true" size={19} />
      )}
    </button>
  );
}

export default ThemeToggle;