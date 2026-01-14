import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Cloud, Search, Bell } from 'lucide-react';
import { ThemeToggleCompact } from '../ui/ThemeToggle';
import { useProgress } from '../../contexts/ProgressContext';

export function TopBar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { userProgress } = useProgress();

    return (
        <>
            <header className="
        fixed top-0 left-0 right-0 z-50
        bg-white/80 dark:bg-dark-900/80 backdrop-blur-xl
        border-b border-dark-200 dark:border-dark-700
        px-4 py-3
        lg:hidden
      ">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-purple">
                            <Cloud className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-display font-bold text-lg gradient-text">CloudVerse</span>
                    </Link>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <button className="p-2 rounded-xl text-dark-500 hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors">
                            <Search className="w-5 h-5" />
                        </button>
                        <div className="relative">
                            <button className="p-2 rounded-xl text-dark-500 hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors">
                                <Bell className="w-5 h-5" />
                            </button>
                            {userProgress.currentStreak > 0 && (
                                <span className="absolute top-1 right-1 w-2 h-2 bg-accent-amber rounded-full" />
                            )}
                        </div>
                        <ThemeToggleCompact />
                        <button
                            onClick={() => setMenuOpen(true)}
                            className="p-2 rounded-xl text-dark-500 hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {menuOpen && (
                    <>
                        <motion.div
                            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMenuOpen(false)}
                        />
                        <motion.div
                            className="fixed top-0 right-0 bottom-0 w-80 z-50 bg-white dark:bg-dark-900 p-6 lg:hidden"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="font-display font-semibold text-lg text-dark-900 dark:text-white">Menu</h2>
                                <button
                                    onClick={() => setMenuOpen(false)}
                                    className="p-2 rounded-xl text-dark-500 hover:bg-dark-100 dark:hover:bg-dark-800"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <nav className="space-y-2">
                                {[
                                    { path: '/', label: 'Home' },
                                    { path: '/zone-a', label: 'Zone A - Exam Prep' },
                                    { path: '/zone-b', label: 'Zone B - Mastery' },
                                    { path: '/quiz', label: 'Quiz Engine' },
                                    { path: '/analytics', label: 'Analytics' },
                                    { path: '/previous-years', label: 'Previous Years' },
                                    { path: '/settings', label: 'Settings' },
                                ].map(({ path, label }) => (
                                    <Link
                                        key={path}
                                        to={path}
                                        onClick={() => setMenuOpen(false)}
                                        className="block px-4 py-3 rounded-xl text-dark-700 dark:text-dark-200 
                               hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors"
                                    >
                                        {label}
                                    </Link>
                                ))}
                            </nav>

                            {/* Streak Info */}
                            <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-primary-500/10 to-accent-purple/10">
                                <div className="text-sm font-medium text-dark-700 dark:text-dark-200">
                                    🔥 {userProgress.currentStreak} Day Streak
                                </div>
                                <div className="text-xs text-dark-500 dark:text-dark-400 mt-1">
                                    Keep learning to maintain your streak!
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
