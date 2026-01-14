import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Cloud,
    BookOpen,
    Briefcase,
    Brain,
    BarChart3,
    TrendingUp,
    Zap,
    Target,
    Award,
    ArrowRight,
    Clock,
    CheckCircle,
} from 'lucide-react';
import { GlassCard, GlassCardTitle, GlassCardContent } from '../components/ui/GlassCard';
import { ProgressBar, Tag } from '../components/ui/Components';
import { useProgress } from '../contexts/ProgressContext';
import { zoneACategories, zoneBCategories } from '../data/categories';
import { allTopics } from '../data';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function Home() {
    const { userProgress, topicProgress, isLoaded } = useProgress();

    const zoneATopicsCount = allTopics.filter(t => t.zone === 'A').length;
    const zoneBTopicsCount = allTopics.filter(t => t.zone === 'B').length;
    const completedTopics = Array.from(topicProgress.values()).filter(p => p.completed).length;

    const zoneACompleted = Array.from(topicProgress.values())
        .filter(p => {
            const topic = allTopics.find(t => t.id === p.topicId);
            return topic?.zone === 'A' && p.completed;
        }).length;

    const zoneBCompleted = Array.from(topicProgress.values())
        .filter(p => {
            const topic = allTopics.find(t => t.id === p.topicId);
            return topic?.zone === 'B' && p.completed;
        }).length;

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
            >
                <motion.div
                    className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-purple mb-6"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                >
                    <Cloud className="w-10 h-10 text-white" />
                </motion.div>

                <h1 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-4">
                    Welcome to CloudVerse
                </h1>
                <p className="text-lg text-dark-600 dark:text-dark-300 max-w-2xl mx-auto">
                    Master Cloud Computing from absolute beginner to professional level.
                    Your complete learning platform for Cognizant technical interviews.
                </p>
            </motion.section>

            {/* Stats Overview */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
                {[
                    { icon: Zap, label: 'Day Streak', value: userProgress.currentStreak, color: 'text-accent-amber' },
                    { icon: CheckCircle, label: 'Topics Done', value: completedTopics, color: 'text-accent-emerald' },
                    { icon: Brain, label: 'Quizzes Taken', value: userProgress.quizzesTaken, color: 'text-accent-purple' },
                    { icon: Clock, label: 'Hours Spent', value: Math.round(userProgress.totalTimeSpent / 3600), color: 'text-accent-cyan' },
                ].map((stat, index) => (
                    <motion.div key={stat.label} variants={item}>
                        <GlassCard className="text-center">
                            <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                            <div className="text-2xl font-bold text-dark-900 dark:text-white">
                                {isLoaded ? stat.value : '-'}
                            </div>
                            <div className="text-sm text-dark-500 dark:text-dark-400">{stat.label}</div>
                        </GlassCard>
                    </motion.div>
                ))}
            </motion.div>

            {/* Learning Zones */}
            <motion.section
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-6"
            >
                <h2 className="text-2xl font-display font-bold text-dark-900 dark:text-white">
                    Learning Zones
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Zone A */}
                    <motion.div variants={item}>
                        <Link to="/zone-a">
                            <GlassCard className="group h-full" glow>
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500">
                                        <BookOpen className="w-6 h-6 text-white" />
                                    </div>
                                    <Tag variant="success">Exam Focus</Tag>
                                </div>

                                <GlassCardTitle className="text-xl mb-2">
                                    Zone A — Cognizant Exam Mastery
                                </GlassCardTitle>
                                <GlassCardContent className="mb-4">
                                    Master the essential concepts to score 9-10/10 in Cognizant Cloud MCQs.
                                    Focused curriculum covering exam-critical topics.
                                </GlassCardContent>

                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-dark-500 dark:text-dark-400">Progress</span>
                                        <span className="font-medium text-dark-700 dark:text-dark-200">
                                            {zoneACompleted}/{zoneATopicsCount} topics
                                        </span>
                                    </div>
                                    <ProgressBar
                                        value={zoneACompleted}
                                        max={zoneATopicsCount}
                                        color="success"
                                    />
                                </div>

                                <div className="mt-4 flex items-center text-primary-600 dark:text-primary-400 font-medium group-hover:gap-3 transition-all">
                                    Start Learning <ArrowRight className="w-4 h-4 ml-2" />
                                </div>
                            </GlassCard>
                        </Link>
                    </motion.div>

                    {/* Zone B */}
                    <motion.div variants={item}>
                        <Link to="/zone-b">
                            <GlassCard className="group h-full" glow>
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500">
                                        <Briefcase className="w-6 h-6 text-white" />
                                    </div>
                                    <Tag variant="info">Professional</Tag>
                                </div>

                                <GlassCardTitle className="text-xl mb-2">
                                    Zone B — Full Cloud Mastery
                                </GlassCardTitle>
                                <GlassCardContent className="mb-4">
                                    Deep professional understanding of cloud architecture, DevOps,
                                    security, and advanced topics for career growth.
                                </GlassCardContent>

                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-dark-500 dark:text-dark-400">Progress</span>
                                        <span className="font-medium text-dark-700 dark:text-dark-200">
                                            {zoneBCompleted}/{zoneBTopicsCount} topics
                                        </span>
                                    </div>
                                    <ProgressBar
                                        value={zoneBCompleted}
                                        max={zoneBTopicsCount}
                                        color="primary"
                                    />
                                </div>

                                <div className="mt-4 flex items-center text-primary-600 dark:text-primary-400 font-medium group-hover:gap-3 transition-all">
                                    Explore Topics <ArrowRight className="w-4 h-4 ml-2" />
                                </div>
                            </GlassCard>
                        </Link>
                    </motion.div>
                </div>
            </motion.section>

            {/* Quick Actions */}
            <motion.section
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-6"
            >
                <h2 className="text-2xl font-display font-bold text-dark-900 dark:text-white">
                    Quick Actions
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { icon: Brain, label: 'Start Quiz', path: '/quiz', color: 'from-purple-500 to-pink-500' },
                        { icon: BarChart3, label: 'Analytics', path: '/analytics', color: 'from-cyan-500 to-blue-500' },
                        { icon: Target, label: 'Previous Years', path: '/previous-years', color: 'from-amber-500 to-orange-500' },
                        { icon: Award, label: 'Achievements', path: '/analytics#achievements', color: 'from-emerald-500 to-green-500' },
                    ].map((action, index) => (
                        <motion.div key={action.label} variants={item}>
                            <Link to={action.path}>
                                <GlassCard className="text-center group cursor-pointer">
                                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${action.color} mb-3 
                                   group-hover:scale-110 transition-transform`}>
                                        <action.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="font-medium text-dark-800 dark:text-dark-100">
                                        {action.label}
                                    </div>
                                </GlassCard>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Featured Categories */}
            <motion.section
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-6"
            >
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-display font-bold text-dark-900 dark:text-white">
                        Start with Fundamentals
                    </h2>
                    <Link
                        to="/zone-a"
                        className="text-primary-600 dark:text-primary-400 font-medium hover:underline flex items-center gap-1"
                    >
                        View All <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                    {zoneACategories.slice(0, 3).map((category, index) => (
                        <motion.div key={category.id} variants={item}>
                            <Link to={`/zone-a/${category.id}`}>
                                <GlassCard className="group">
                                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${category.color} mb-3`}>
                                        <BookOpen className="w-5 h-5 text-white" />
                                    </div>
                                    <GlassCardTitle className="text-lg mb-1">{category.name}</GlassCardTitle>
                                    <GlassCardContent className="text-sm">
                                        {category.topics.length} topics • {category.description}
                                    </GlassCardContent>
                                </GlassCard>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </motion.section>
        </div>
    );
}
