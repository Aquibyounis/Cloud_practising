import React from 'react';
import { motion } from 'framer-motion';
import {
    Settings as SettingsIcon,
    Sun,
    Moon,
    Stars,
    Eye,
    Bell,
    Download,
    Trash2,
    Github,
    HelpCircle,
} from 'lucide-react';
import { GlassCard, GlassCardTitle, GlassCardContent } from '../components/ui/GlassCard';
import { Button, Tag } from '../components/ui/Components';
import { useTheme } from '../contexts/ThemeContext';
import { useProgress } from '../contexts/ProgressContext';

export default function Settings() {
    const { theme, setTheme, focusMode, setFocusMode } = useTheme();
    const { userProgress, exportProgress, resetProgress } = useProgress();

    const handleExport = async () => {
        const data = await exportProgress();
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `cloudverse-progress-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleReset = async () => {
        if (window.confirm('Are you sure you want to reset all progress? This action cannot be undone.')) {
            await resetProgress();
            window.location.reload();
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <GlassCard glow>
                    <div className="flex items-center gap-4">
                        <div className="p-4 rounded-xl bg-gradient-to-br from-slate-500 to-zinc-500">
                            <SettingsIcon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-display font-bold text-dark-900 dark:text-white">
                                Settings
                            </h1>
                            <p className="text-dark-600 dark:text-dark-300">
                                Customize your learning experience
                            </p>
                        </div>
                    </div>
                </GlassCard>
            </motion.div>

            {/* Appearance */}
            <GlassCard>
                <GlassCardTitle className="mb-4">Appearance</GlassCardTitle>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-dark-700 dark:text-dark-200 mb-3">
                            Theme
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { value: 'light', label: 'Light', icon: Sun },
                                { value: 'dark', label: 'Dark', icon: Moon },
                                { value: 'night', label: 'Night', icon: Stars },
                            ].map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => setTheme(option.value as typeof theme)}
                                    className={`
                    flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all
                    ${theme === option.value
                                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                            : 'border-dark-200 dark:border-dark-700 hover:border-primary-300'
                                        }
                  `}
                                >
                                    <option.icon className={`w-6 h-6 ${theme === option.value ? 'text-primary-500' : 'text-dark-400'}`} />
                                    <span className={`font-medium ${theme === option.value ? 'text-primary-600 dark:text-primary-400' : 'text-dark-600 dark:text-dark-300'}`}>
                                        {option.label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-dark-200 dark:border-dark-700 pt-4">
                        <label className="flex items-center justify-between cursor-pointer">
                            <div>
                                <div className="font-medium text-dark-900 dark:text-white">Focus Mode</div>
                                <div className="text-sm text-dark-500 dark:text-dark-400">
                                    Hide navigation for distraction-free reading
                                </div>
                            </div>
                            <input
                                type="checkbox"
                                checked={focusMode}
                                onChange={(e) => setFocusMode(e.target.checked)}
                                className="w-5 h-5 rounded"
                            />
                        </label>
                    </div>
                </div>
            </GlassCard>

            {/* Data Management */}
            <GlassCard>
                <GlassCardTitle className="mb-4">Data Management</GlassCardTitle>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="font-medium text-dark-900 dark:text-white">Export Progress</div>
                            <div className="text-sm text-dark-500 dark:text-dark-400">
                                Download your learning data as JSON
                            </div>
                        </div>
                        <Button variant="secondary" size="sm" onClick={handleExport} icon={Download}>
                            Export
                        </Button>
                    </div>

                    <div className="border-t border-dark-200 dark:border-dark-700 pt-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-medium text-red-600 dark:text-red-400">Reset Progress</div>
                                <div className="text-sm text-dark-500 dark:text-dark-400">
                                    Clear all progress data (cannot be undone)
                                </div>
                            </div>
                            <Button variant="danger" size="sm" onClick={handleReset} icon={Trash2}>
                                Reset
                            </Button>
                        </div>
                    </div>
                </div>
            </GlassCard>

            {/* About */}
            <GlassCard>
                <GlassCardTitle className="mb-4">About CloudVerse</GlassCardTitle>

                <div className="space-y-3 text-dark-600 dark:text-dark-300">
                    <p>
                        CloudVerse is a comprehensive cloud computing learning platform designed
                        to help you master cloud concepts from beginner to professional level.
                    </p>
                    <div className="flex items-center gap-4 pt-2">
                        <Tag>v1.0.0</Tag>
                        <span className="text-sm">Built with React + TypeScript</span>
                    </div>
                </div>
            </GlassCard>

            {/* Stats Summary */}
            <GlassCard>
                <GlassCardTitle className="mb-4">Your Statistics</GlassCardTitle>

                <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                        <div className="text-2xl font-bold text-dark-900 dark:text-white">
                            {userProgress.topicsCompleted}
                        </div>
                        <div className="text-sm text-dark-500 dark:text-dark-400">Topics Completed</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-dark-900 dark:text-white">
                            {userProgress.quizzesTaken}
                        </div>
                        <div className="text-sm text-dark-500 dark:text-dark-400">Quizzes Taken</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-dark-900 dark:text-white">
                            {userProgress.currentStreak}
                        </div>
                        <div className="text-sm text-dark-500 dark:text-dark-400">Current Streak</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-dark-900 dark:text-white">
                            {Math.round(userProgress.totalTimeSpent / 3600)}h
                        </div>
                        <div className="text-sm text-dark-500 dark:text-dark-400">Time Learned</div>
                    </div>
                </div>
            </GlassCard>
        </div >
    );
}
