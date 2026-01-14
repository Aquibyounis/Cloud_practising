import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Home,
    BookOpen,
    Brain,
    BarChart3,
    Settings,
} from 'lucide-react';

const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/zone-a', icon: BookOpen, label: 'Learn' },
    { path: '/quiz', icon: Brain, label: 'Quiz' },
    { path: '/analytics', icon: BarChart3, label: 'Progress' },
    { path: '/settings', icon: Settings, label: 'Settings' },
];

export function BottomNav() {
    const location = useLocation();

    return (
        <motion.nav
            className="
        bottom-nav fixed bottom-0 left-0 right-0 z-40
        bg-white/90 dark:bg-dark-900/90 backdrop-blur-xl
        border-t border-dark-200 dark:border-dark-700
        px-2 pb-safe flex justify-around items-center
        lg:hidden
      "
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
        >
            {navItems.map(({ path, icon: Icon, label }) => {
                const isActive = location.pathname === path ||
                    (path !== '/' && location.pathname.startsWith(path));

                return (
                    <NavLink
                        key={path}
                        to={path}
                        className={`
              flex flex-col items-center justify-center py-2 px-4 relative
              transition-colors duration-200
              ${isActive
                                ? 'text-primary-500'
                                : 'text-dark-500 dark:text-dark-400'
                            }
            `}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="bottom-nav-indicator"
                                className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary-500 rounded-b-full"
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            />
                        )}
                        <motion.div
                            whileTap={{ scale: 0.9 }}
                            className="relative"
                        >
                            <Icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5px]' : ''}`} />
                        </motion.div>
                        <span className={`text-xs mt-1 ${isActive ? 'font-medium' : ''}`}>
                            {label}
                        </span>
                    </NavLink>
                );
            })}
        </motion.nav>
    );
}
