import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { ThemeMode } from '../types';

interface ThemeContextType {
    theme: ThemeMode;
    setTheme: (theme: ThemeMode) => void;
    toggleTheme: () => void;
    focusMode: boolean;
    setFocusMode: (enabled: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_KEY = 'cloudverse-theme';
const FOCUS_KEY = 'cloudverse-focus';

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<ThemeMode>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem(THEME_KEY) as ThemeMode;
            if (saved) return saved;
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return 'light';
    });

    const [focusMode, setFocusModeState] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(FOCUS_KEY) === 'true';
        }
        return false;
    });

    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove('light', 'dark', 'night');

        if (theme === 'night') {
            root.classList.add('dark', 'night');
            document.body.classList.add('night');
        } else {
            root.classList.add(theme);
            document.body.classList.remove('night');
        }

        localStorage.setItem(THEME_KEY, theme);
    }, [theme]);

    useEffect(() => {
        if (focusMode) {
            document.body.classList.add('focus-mode');
        } else {
            document.body.classList.remove('focus-mode');
        }
        localStorage.setItem(FOCUS_KEY, String(focusMode));
    }, [focusMode]);

    const setTheme = (newTheme: ThemeMode) => {
        setThemeState(newTheme);
    };

    const toggleTheme = () => {
        setThemeState(prev => {
            if (prev === 'light') return 'dark';
            if (prev === 'dark') return 'night';
            return 'light';
        });
    };

    const setFocusMode = (enabled: boolean) => {
        setFocusModeState(enabled);
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, focusMode, setFocusMode }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
