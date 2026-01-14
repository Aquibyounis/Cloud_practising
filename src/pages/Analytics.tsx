import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
    BarChart3,
    TrendingUp,
    Clock,
    Target,
    Brain,
    Zap,
    Calendar,
    Download,
    RotateCcw,
    CheckCircle,
    AlertCircle,
} from 'lucide-react';
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    PieChart,
    Pie,
    Cell,
} from 'recharts';
import { GlassCard, GlassCardTitle, GlassCardContent } from '../components/ui/GlassCard';
import { ProgressBar, Tag, Button } from '../components/ui/Components';
import { useProgress } from '../contexts/ProgressContext';
import { allTopics } from '../data';
import { zoneACategories, zoneBCategories } from '../data/categories';

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function Analytics() {
    const { userProgress, topicProgress, dailyActivities, exportProgress, resetProgress, isLoaded } = useProgress();

    const stats = useMemo(() => {
        const zoneATopics = allTopics.filter(t => t.zone === 'A');
        const zoneBTopics = allTopics.filter(t => t.zone === 'B');

        const zoneACompleted = zoneATopics.filter(t => topicProgress.get(t.id)?.completed).length;
        const zoneBCompleted = zoneBTopics.filter(t => topicProgress.get(t.id)?.completed).length;

        // Calculate weak topics (low quiz scores)
        const weakTopics = Array.from(topicProgress.entries())
            .filter(([_, p]) => p.quizScores.length > 0)
            .map(([id, p]) => {
                const avgScore = p.quizScores.reduce((sum, s) => sum + (s.score / s.totalQuestions) * 100, 0) / p.quizScores.length;
                const topic = allTopics.find(t => t.id === id);
                return { id, title: topic?.title || id, avgScore, attempts: p.quizScores.length };
            })
            .filter(t => t.avgScore < 70)
            .sort((a, b) => a.avgScore - b.avgScore)
            .slice(0, 5);

        return {
            zoneAProgress: zoneATopics.length > 0 ? Math.round((zoneACompleted / zoneATopics.length) * 100) : 0,
            zoneBProgress: zoneBTopics.length > 0 ? Math.round((zoneBCompleted / zoneBTopics.length) * 100) : 0,
            zoneACompleted,
            zoneBCompleted,
            zoneATotal: zoneATopics.length,
            zoneBTotal: zoneBTopics.length,
            weakTopics,
        };
    }, [topicProgress]);

    const activityData = useMemo(() => {
        // Last 30 days
        const today = new Date();
        const data = [];
        for (let i = 29; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            const activity = dailyActivities.find(a => a.date === dateStr);
            data.push({
                date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                minutes: activity ? Math.round(activity.timeSpent / 60) : 0,
                questions: activity?.questionsAnswered || 0,
            });
        }
        return data;
    }, [dailyActivities]);

    const pieData = [
        { name: 'Zone A Completed', value: stats.zoneACompleted, color: '#10b981' },
        { name: 'Zone A Remaining', value: stats.zoneATotal - stats.zoneACompleted, color: '#e2e8f0' },
        { name: 'Zone B Completed', value: stats.zoneBCompleted, color: '#6366f1' },
        { name: 'Zone B Remaining', value: stats.zoneBTotal - stats.zoneBCompleted, color: '#e2e8f0' },
    ];

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
        if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
            await resetProgress();
            window.location.reload();
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <GlassCard glow>
                    <div className="flex items-center gap-4">
                        <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500">
                            <BarChart3 className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-2xl font-display font-bold text-dark-900 dark:text-white">
                                Learning Analytics
                            </h1>
                            <p className="text-dark-600 dark:text-dark-300">
                                Track your progress and identify areas for improvement
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="secondary" size="sm" onClick={handleExport} icon={Download}>
                                Export
                            </Button>
                            <Button variant="ghost" size="sm" onClick={handleReset} icon={RotateCcw}>
                                Reset
                            </Button>
                        </div>
                    </div>
                </GlassCard>
            </motion.div>

            {/* Key Metrics */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
                {[
                    { icon: Zap, label: 'Day Streak', value: userProgress.currentStreak, color: 'text-accent-amber', bg: 'from-amber-500 to-orange-500' },
                    { icon: CheckCircle, label: 'Topics Completed', value: stats.zoneACompleted + stats.zoneBCompleted, color: 'text-emerald-500', bg: 'from-emerald-500 to-green-500' },
                    { icon: Brain, label: 'Quiz Avg', value: `${Math.round(userProgress.averageQuizScore)}%`, color: 'text-purple-500', bg: 'from-purple-500 to-pink-500' },
                    { icon: Clock, label: 'Hours Learned', value: Math.round(userProgress.totalTimeSpent / 3600), color: 'text-cyan-500', bg: 'from-cyan-500 to-blue-500' },
                ].map((stat) => (
                    <motion.div key={stat.label} variants={item}>
                        <GlassCard className="text-center">
                            <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.bg} mb-3`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="text-2xl font-bold text-dark-900 dark:text-white">
                                {isLoaded ? stat.value : '-'}
                            </div>
                            <div className="text-sm text-dark-500 dark:text-dark-400">{stat.label}</div>
                        </GlassCard>
                    </motion.div>
                ))}
            </motion.div>

            {/* Zone Progress */}
            <div className="grid md:grid-cols-2 gap-6">
                <GlassCard>
                    <GlassCardTitle className="mb-4">Zone A Progress</GlassCardTitle>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="text-4xl font-bold text-emerald-500">{stats.zoneAProgress}%</div>
                        <div className="flex-1">
                            <div className="text-sm text-dark-600 dark:text-dark-400 mb-1">
                                {stats.zoneACompleted} of {stats.zoneATotal} topics completed
                            </div>
                            <ProgressBar value={stats.zoneACompleted} max={stats.zoneATotal} color="success" />
                        </div>
                    </div>
                    <div className="text-sm text-dark-500 dark:text-dark-400">
                        Cognizant Exam Preparation Track
                    </div>
                </GlassCard>

                <GlassCard>
                    <GlassCardTitle className="mb-4">Zone B Progress</GlassCardTitle>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="text-4xl font-bold text-primary-500">{stats.zoneBProgress}%</div>
                        <div className="flex-1">
                            <div className="text-sm text-dark-600 dark:text-dark-400 mb-1">
                                {stats.zoneBCompleted} of {stats.zoneBTotal} topics completed
                            </div>
                            <ProgressBar value={stats.zoneBCompleted} max={stats.zoneBTotal} />
                        </div>
                    </div>
                    <div className="text-sm text-dark-500 dark:text-dark-400">
                        Professional Cloud Mastery Track
                    </div>
                </GlassCard>
            </div>

            {/* Activity Chart */}
            <GlassCard>
                <GlassCardTitle className="mb-4">Learning Activity (Last 30 Days)</GlassCardTitle>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={activityData}>
                            <defs>
                                <linearGradient id="colorMinutes" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="date"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12 }}
                                interval="preserveStartEnd"
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12 }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: 'white',
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="minutes"
                                stroke="#6366f1"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorMinutes)"
                                name="Minutes"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </GlassCard>

            {/* Weak Topics */}
            {stats.weakTopics.length > 0 && (
                <GlassCard>
                    <GlassCardTitle className="mb-4 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-amber-500" />
                        Topics Needing Attention
                    </GlassCardTitle>
                    <GlassCardContent className="mb-4">
                        These topics have lower quiz scores. Review them to improve mastery.
                    </GlassCardContent>
                    <div className="space-y-3">
                        {stats.weakTopics.map((topic) => (
                            <div key={topic.id} className="flex items-center justify-between p-3 rounded-lg bg-dark-50 dark:bg-dark-800/50">
                                <div>
                                    <div className="font-medium text-dark-900 dark:text-white">{topic.title}</div>
                                    <div className="text-sm text-dark-500 dark:text-dark-400">{topic.attempts} attempts</div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Tag variant="warning">{Math.round(topic.avgScore)}%</Tag>
                                </div>
                            </div>
                        ))}
                    </div>
                </GlassCard>
            )}

            {/* Streak Info */}
            <GlassCard>
                <div className="flex items-center justify-between">
                    <div>
                        <GlassCardTitle className="flex items-center gap-2">
                            <Zap className="w-5 h-5 text-accent-amber" />
                            Streak Statistics
                        </GlassCardTitle>
                        <div className="mt-2 text-dark-600 dark:text-dark-300">
                            Keep learning daily to build your streak!
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-bold text-dark-900 dark:text-white">
                            {userProgress.currentStreak} days
                        </div>
                        <div className="text-sm text-dark-500 dark:text-dark-400">
                            Longest: {userProgress.longestStreak} days
                        </div>
                    </div>
                </div>
            </GlassCard>
        </div>
    );
}
