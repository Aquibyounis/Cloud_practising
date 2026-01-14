import React, { useState, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';
import { TopBar } from './TopBar';

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-dark-50 dark:bg-dark-950">
            {/* Background gradient */}
            <div className="mesh-bg" />

            {/* Desktop Sidebar */}
            <Sidebar
                collapsed={sidebarCollapsed}
                onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            />

            {/* Mobile Top Bar */}
            <TopBar />

            {/* Main Content */}
            <motion.main
                className={`
          min-h-screen transition-all duration-300
          pt-16 lg:pt-0
          pb-20 lg:pb-0
          ${sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-72'}
        `}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
            >
                <div className="max-w-7xl mx-auto px-4 py-4 lg:px-8 lg:py-8">
                    {children}
                </div>
            </motion.main>

            {/* Mobile Bottom Nav */}
            <BottomNav />
        </div>
    );
}
