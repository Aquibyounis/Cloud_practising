import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Home,
    BookOpen,
    Briefcase,
    Brain,
    BarChart3,
    History,
    Settings,
    ChevronLeft,
    ChevronRight,
    Cloud,
    Zap,
} from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';
import { useProgress } from '../../contexts/ProgressContext';

interface SidebarProps {
    collapsed: boolean;
    onToggle: () => void;
}

const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/zone-a', icon: BookOpen, label: 'Zone A - Exam Prep' },
    { path: '/zone-b', icon: Briefcase, label: 'Zone B - Mastery' },
    { path: '/quiz', icon: Brain, label: 'Quiz Engine' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/previous-years', icon: History, label: 'Previous Years' },
    { path: '/settings', icon: Settings, label: 'Settings' },
];

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
    const location = useLocation();
    const { userProgress } = useProgress();

    return (
        <motion.aside
            className={`
        sidebar fixed left-0 top-0 h-full z-40
        bg-white/80 dark:bg-dark-900/80 backdrop-blur-xl
        border-r border-dark-200 dark:border-dark-700
        transition-all duration-300 ease-out
        ${collapsed ? 'w-20' : 'w-72'}
        hidden lg:flex flex-col
      `}
            initial={false}
            animate={{ width: collapsed ? 80 : 288 }}
        >
            {/* Logo */}
            <div className="flex items-center gap-3 p-5 border-b border-dark-200 dark:border-dark-700">
                <motion.div
                    className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-purple"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                >
                    <Cloud className="w-6 h-6 text-white" />
                </motion.div>
                {!collapsed && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                    >
                        <h1 className="font-display font-bold text-xl gradient-text">CloudVerse</h1>
                        <p className="text-xs text-dark-500 dark:text-dark-400">Cloud Learning Platform</p>
                    </motion.div>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto no-scrollbar">
                {navItems.map(({ path, icon: Icon, label }) => {
                    const isActive = location.pathname === path ||
                        (path !== '/' && location.pathname.startsWith(path));

                    return (
                        <NavLink
                            key={path}
                            to={path}
                            className={`
                flex items-center gap-3 px-3 py-3 rounded-xl
                transition-all duration-200 group relative
                ${isActive
                                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                                    : 'text-dark-600 dark:text-dark-400 hover:bg-dark-100 dark:hover:bg-dark-800'
                                }
              `}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="sidebar-indicator"
                                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary-500 rounded-r-full"
                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                />
                            )}
                            <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-primary-500' : ''}`} />
                            {!collapsed && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="font-medium"
                                >
                                    {label}
                                </motion.span>
                            )}
                            {collapsed && (
                                <div className="absolute left-full ml-3 px-3 py-1.5 rounded-lg bg-dark-800 text-white text-sm
                               opacity-0 invisible group-hover:opacity-100 group-hover:visible
                               transition-all duration-200 whitespace-nowrap z-50">
                                    {label}
                                </div>
                            )}
                        </NavLink>
                    );
                })}
            </nav>

            {/* Stats Preview */}
            {!collapsed && (
                <div className="p-4 mx-3 mb-3 rounded-xl bg-gradient-to-br from-primary-500/10 to-accent-purple/10 border border-primary-200/50 dark:border-primary-700/50">
                    <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-4 h-4 text-accent-amber" />
                        <span className="text-sm font-medium text-dark-700 dark:text-dark-200">
                            {userProgress.currentStreak} Day Streak
                        </span>
                    </div>
                    <div className="text-xs text-dark-500 dark:text-dark-400">
                        {userProgress.topicsCompleted} topics completed
                    </div>
                </div>
            )}

            {/* Theme Toggle & Collapse */}
            <div className="p-4 border-t border-dark-200 dark:border-dark-700">
                <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
                    {!collapsed && <ThemeToggle />}
                    <motion.button
                        onClick={onToggle}
                        className="p-2 rounded-lg text-dark-500 hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors"
                        whileTap={{ scale: 0.95 }}
                    >
                        {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                    </motion.button>
                </div>
            </div>
        </motion.aside>
    );
}
