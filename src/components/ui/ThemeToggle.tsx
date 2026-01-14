import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Stars } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import type { ThemeMode } from '../../types';

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    const themes: { mode: ThemeMode; icon: React.ReactNode; label: string }[] = [
        { mode: 'light', icon: <Sun className="w-4 h-4" />, label: 'Light' },
        { mode: 'dark', icon: <Moon className="w-4 h-4" />, label: 'Dark' },
        { mode: 'night', icon: <Stars className="w-4 h-4" />, label: 'Night' },
    ];

    return (
        <div className="flex items-center gap-1 p-1 rounded-xl bg-dark-100 dark:bg-dark-800">
            {themes.map(({ mode, icon, label }) => (
                <motion.button
                    key={mode}
                    onClick={() => setTheme(mode)}
                    className={`
            relative flex items-center justify-center p-2 rounded-lg
            transition-colors duration-200
            ${theme === mode
                            ? 'text-white'
                            : 'text-dark-500 dark:text-dark-400 hover:text-dark-700 dark:hover:text-dark-200'
                        }
          `}
                    whileTap={{ scale: 0.95 }}
                    title={label}
                >
                    {theme === mode && (
                        <motion.div
                            layoutId="theme-indicator"
                            className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg"
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                    )}
                    <span className="relative z-10">{icon}</span>
                </motion.button>
            ))}
        </div>
    );
}

export function ThemeToggleCompact() {
    const { theme, toggleTheme } = useTheme();

    const icon = theme === 'light'
        ? <Sun className="w-5 h-5" />
        : theme === 'dark'
            ? <Moon className="w-5 h-5" />
            : <Stars className="w-5 h-5" />;

    return (
        <motion.button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-300
                 hover:bg-dark-200 dark:hover:bg-dark-700 transition-colors"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            title={`Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'night' : 'light'} mode`}
        >
            <motion.div
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
            >
                {icon}
            </motion.div>
        </motion.button>
    );
}
