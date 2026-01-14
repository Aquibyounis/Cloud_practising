import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    BookOpen,
    Clock,
    CheckCircle,
    ChevronRight,
    Target,
    Lightbulb,
} from 'lucide-react';
import { GlassCard, GlassCardTitle, GlassCardContent } from '../components/ui/GlassCard';
import { ProgressBar, Tag } from '../components/ui/Components';
import { useProgress } from '../contexts/ProgressContext';
import { zoneACategories } from '../data/categories';
import { getTopicsByCategory, allTopics } from '../data';

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function ZoneA() {
    const { categoryId } = useParams<{ categoryId?: string }>();
    const { topicProgress, getTopicProgress } = useProgress();

    // Calculate zone progress
    const zoneTopics = allTopics.filter(t => t.zone === 'A');
    const completedCount = zoneTopics.filter(t =>
        topicProgress.get(t.id)?.completed
    ).length;
    const totalEstimatedTime = zoneTopics.reduce((sum, t) => sum + t.estimatedTime, 0);

    if (categoryId) {
        // Show topics for a specific category
        const category = zoneACategories.find(c => c.id === categoryId);
        const topics = getTopicsByCategory(categoryId);

        if (!category) {
            return (
                <div className="text-center py-20">
                    <h2 className="text-2xl font-bold text-dark-900 dark:text-white">Category not found</h2>
                    <Link to="/zone-a" className="text-primary-500 hover:underline mt-4 block">
                        Back to Zone A
                    </Link>
                </div>
            );
        }

        const categoryCompleted = topics.filter(t =>
            topicProgress.get(t.id)?.completed
        ).length;

        return (
            <div className="space-y-6">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-dark-500 dark:text-dark-400">
                    <Link to="/zone-a" className="hover:text-primary-500">Zone A</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-dark-900 dark:text-white">{category.name}</span>
                </nav>

                {/* Category Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <GlassCard glow>
                        <div className="flex items-start gap-4">
                            <div className={`p-4 rounded-xl bg-gradient-to-br ${category.color}`}>
                                <BookOpen className="w-8 h-8 text-white" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-2xl font-display font-bold text-dark-900 dark:text-white">
                                        {category.name}
                                    </h1>
                                    <Tag variant="success">Zone A</Tag>
                                </div>
                                <p className="text-dark-600 dark:text-dark-300 mb-4">{category.description}</p>
                                <div className="flex items-center gap-6 text-sm">
                                    <div className="flex items-center gap-2">
                                        <BookOpen className="w-4 h-4 text-dark-400" />
                                        <span>{topics.length} topics</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                                        <span>{categoryCompleted} completed</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-dark-400" />
                                        <span>{topics.reduce((sum, t) => sum + t.estimatedTime, 0)} min</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                </motion.div>

                {/* Topics List */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid gap-4"
                >
                    {topics.map((topic, index) => {
                        const progress = getTopicProgress(topic.id);
                        const isCompleted = progress?.completed;

                        return (
                            <motion.div key={topic.id} variants={item}>
                                <Link to={`/topic/${topic.slug}`}>
                                    <GlassCard className="group">
                                        <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                                            <div className={`
                      w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-bold text-base sm:text-lg flex-shrink-0
                      ${isCompleted
                                                    ? 'bg-emerald-500 text-white'
                                                    : 'bg-dark-100 dark:bg-dark-700 text-dark-500 dark:text-dark-400'
                                                }
                    `}>
                                                {isCompleted ? <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" /> : index + 1}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-sm sm:text-base text-dark-900 dark:text-white group-hover:text-primary-500 transition-colors">
                                                    {topic.title}
                                                </h3>
                                                <p className="text-xs sm:text-sm text-dark-500 dark:text-dark-400 line-clamp-2">
                                                    {topic.description}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-dark-500 dark:text-dark-400 flex-shrink-0">
                                                <div className="hidden sm:flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    <span>{topic.estimatedTime} min</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Target className="w-4 h-4" />
                                                    <span>{topic.mcqs.length} MCQs</span>
                                                </div>
                                                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </GlassCard>
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        );
    }

    // Show all categories
    return (
        <div className="space-y-8">
            {/* Zone Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <GlassCard glow>
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                        <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 self-start">
                            <Target className="w-10 h-10 text-white" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-3xl font-display font-bold text-dark-900 dark:text-white">
                                    Zone A — Cognizant Exam Mastery
                                </h1>
                            </div>
                            <p className="text-dark-600 dark:text-dark-300 mb-4">
                                Master the essential concepts to maximize your MCQ score (9-10/10) in Cognizant technical interviews.
                                This zone covers all exam-critical cloud computing topics.
                            </p>
                            <div className="flex flex-wrap items-center gap-6 text-sm">
                                <div className="flex items-center gap-2">
                                    <BookOpen className="w-4 h-4 text-dark-400" />
                                    <span>{zoneTopics.length} topics</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                                    <span>{completedCount} completed</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-dark-400" />
                                    <span>{totalEstimatedTime} min total</span>
                                </div>
                            </div>
                        </div>
                        <div className="md:w-48">
                            <div className="text-center mb-2">
                                <span className="text-3xl font-bold text-dark-900 dark:text-white">
                                    {Math.round((completedCount / zoneTopics.length) * 100) || 0}%
                                </span>
                            </div>
                            <ProgressBar value={completedCount} max={zoneTopics.length} color="success" />
                        </div>
                    </div>
                </GlassCard>
            </motion.div>

            {/* Focus Tips */}
            <GlassCard padding="md">
                <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-accent-amber flex-shrink-0 mt-0.5" />
                    <div>
                        <span className="font-medium text-dark-900 dark:text-white">Exam Strategy: </span>
                        <span className="text-dark-600 dark:text-dark-300">
                            Focus on Cloud Fundamentals, Service Models, and AWS Core Services first.
                            These topics appear most frequently in Cognizant interviews.
                        </span>
                    </div>
                </div>
            </GlassCard>

            {/* Categories Grid */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
                {zoneACategories.map((category) => {
                    const categoryTopics = getTopicsByCategory(category.id);
                    const categoryCompleted = categoryTopics.filter(t =>
                        topicProgress.get(t.id)?.completed
                    ).length;
                    const progress = categoryTopics.length > 0
                        ? (categoryCompleted / categoryTopics.length) * 100
                        : 0;

                    return (
                        <motion.div key={category.id} variants={item}>
                            <Link to={`/zone-a/${category.id}`}>
                                <GlassCard className="group h-full">
                                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${category.color} mb-4`}>
                                        <BookOpen className="w-6 h-6 text-white" />
                                    </div>

                                    <GlassCardTitle className="text-lg mb-2 group-hover:text-primary-500 transition-colors">
                                        {category.name}
                                    </GlassCardTitle>
                                    <GlassCardContent className="text-sm mb-4">
                                        {category.description}
                                    </GlassCardContent>

                                    <div className="mt-auto space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-dark-500 dark:text-dark-400">
                                                {categoryTopics.length} topics
                                            </span>
                                            <span className="font-medium text-dark-700 dark:text-dark-200">
                                                {categoryCompleted}/{categoryTopics.length}
                                            </span>
                                        </div>
                                        <ProgressBar value={progress} size="sm" color="success" />
                                    </div>
                                </GlassCard>
                            </Link>
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
}
