import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    History,
    TrendingUp,
    BarChart3,
    Filter,
    Search,
    Calendar,
} from 'lucide-react';
import { GlassCard, GlassCardTitle, GlassCardContent } from '../components/ui/GlassCard';
import { Tag, Button } from '../components/ui/Components';
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
} from 'recharts';

// Mock previous years data
const topicFrequencyData = [
    { topic: 'Cloud Fundamentals', count: 45, trend: 'stable' },
    { topic: 'IaaS/PaaS/SaaS', count: 38, trend: 'up' },
    { topic: 'AWS Services', count: 35, trend: 'up' },
    { topic: 'Security', count: 32, trend: 'up' },
    { topic: 'Virtualization', count: 28, trend: 'stable' },
    { topic: 'Networking', count: 25, trend: 'down' },
    { topic: 'DevOps', count: 22, trend: 'up' },
    { topic: 'Storage Types', count: 20, trend: 'stable' },
];

const yearlyTrends = [
    { year: '2022', questions: 180 },
    { year: '2023', questions: 210 },
    { year: '2024', questions: 245 },
    { year: '2025', questions: 280 },
];

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function PreviousYears() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <GlassCard glow>
                    <div className="flex items-center gap-4">
                        <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500">
                            <History className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-display font-bold text-dark-900 dark:text-white">
                                Previous Years Analysis
                            </h1>
                            <p className="text-dark-600 dark:text-dark-300">
                                Cognizant cloud MCQ patterns and frequently asked topics
                            </p>
                        </div>
                    </div>
                </GlassCard>
            </motion.div>

            {/* Insights */}
            <div className="grid md:grid-cols-3 gap-4">
                <GlassCard className="text-center">
                    <div className="text-3xl font-bold text-primary-500 mb-2">85%</div>
                    <div className="text-dark-600 dark:text-dark-300">
                        Questions from Zone A topics
                    </div>
                </GlassCard>
                <GlassCard className="text-center">
                    <div className="text-3xl font-bold text-emerald-500 mb-2">Top 5</div>
                    <div className be="text-dark-600 dark:text-dark-300">
                        Topics cover 60% of questions
                    </div>
                </GlassCard>
                <GlassCard className="text-center">
                    <div className="text-3xl font-bold text-amber-500 mb-2">+15%</div>
                    <div className="text-dark-600 dark:text-dark-300">
                        Security questions YoY growth
                    </div>
                </GlassCard>
            </div>

            {/* Topic Frequency */}
            <GlassCard>
                <GlassCardTitle className="mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary-500" />
                    Most Frequently Asked Topics
                </GlassCardTitle>
                <GlassCardContent className="mb-4">
                    Based on analysis of previous Cognizant cloud MCQs. Focus on these topics for maximum impact.
                </GlassCardContent>

                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="space-y-3"
                >
                    {topicFrequencyData.map((topic, index) => (
                        <motion.div key={topic.topic} variants={item}>
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center font-bold text-white text-sm">
                                    {index + 1}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-medium text-dark-900 dark:text-white">{topic.topic}</span>
                                        <div className="flex items-center gap-2">
                                            <Tag size="sm" variant={topic.trend === 'up' ? 'success' : topic.trend === 'down' ? 'danger' : 'default'}>
                                                {topic.trend === 'up' ? '↑' : topic.trend === 'down' ? '↓' : '→'} {topic.trend}
                                            </Tag>
                                            <span className="font-mono text-sm text-dark-500">{topic.count}%</span>
                                        </div>
                                    </div>
                                    <div className="h-2 rounded-full bg-dark-100 dark:bg-dark-700 overflow-hidden">
                                        <motion.div
                                            className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-cyan"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${topic.count}%` }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </GlassCard>

            {/* Yearly Trends */}
            <GlassCard>
                <GlassCardTitle className="mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-500" />
                    Question Volume Trend
                </GlassCardTitle>

                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={yearlyTrends}>
                            <XAxis
                                dataKey="year"
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: 'white',
                                }}
                            />
                            <Bar
                                dataKey="questions"
                                fill="url(#colorBar)"
                                radius={[8, 8, 0, 0]}
                                name="Questions"
                            />
                            <defs>
                                <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#6366f1" />
                                    <stop offset="100%" stopColor="#06b6d4" />
                                </linearGradient>
                            </defs>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </GlassCard>

            {/* Tips */}
            <GlassCard>
                <GlassCardTitle className="mb-4">📌 Exam Preparation Tips</GlassCardTitle>
                <ul className="space-y-3">
                    {[
                        'Master Cloud Fundamentals first - they appear in 45% of questions',
                        'Service Models (IaaS/PaaS/SaaS) are tested heavily - know the differences',
                        'AWS services dominate, but know Azure/GCP equivalents',
                        'Security questions are increasing year over year',
                        'Practice comparison questions - they are common traps',
                        'Know the pricing models and when to use each',
                    ].map((tip, i) => (
                        <li key={i} className="flex items-start gap-2">
                            <span className="text-emerald-500 font-bold">✓</span>
                            <span className="text-dark-600 dark:text-dark-300">{tip}</span>
                        </li>
                    ))}
                </ul>
            </GlassCard>

            {/* CTA */}
            <GlassCard className="text-center">
                <h3 className="text-xl font-display font-bold text-dark-900 dark:text-white mb-2">
                    Ready to Practice?
                </h3>
                <p className="text-dark-600 dark:text-dark-300 mb-4">
                    Test your knowledge with questions based on previous patterns
                </p>
                <Link to="/quiz">
                    <Button>Start Practice Quiz</Button>
                </Link>
            </GlassCard>
        </div>
    );
}
