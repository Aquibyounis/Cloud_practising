import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronRight,
    ChevronLeft,
    Clock,
    BookOpen,
    CheckCircle,
    Bookmark,
    BookmarkCheck,
    Target,
    AlertCircle,
    ChevronDown,
    Eye,
    EyeOff,
} from 'lucide-react';
import { GlassCard, GlassCardTitle } from '../components/ui/GlassCard';
import { Button, Tag, Accordion } from '../components/ui/Components';
import { useProgress } from '../contexts/ProgressContext';
import { useTheme } from '../contexts/ThemeContext';
import { getTopicBySlug, allTopics } from '../data';
import { zoneACategories, zoneBCategories } from '../data/categories';

type ContentLevel = 'beginner' | 'intermediate' | 'advanced';

export default function TopicPage() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const { getTopicProgress, updateTopicProgress, markTopicComplete, toggleBookmark } = useProgress();
    const { focusMode, setFocusMode } = useTheme();

    const [contentLevel, setContentLevel] = useState<ContentLevel>('beginner');
    const [showMCQs, setShowMCQs] = useState(false);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
    const [revealedAnswers, setRevealedAnswers] = useState<Set<string>>(new Set());

    const startTimeRef = useRef<Date>(new Date());

    const topic = slug ? getTopicBySlug(slug) : undefined;
    const progress = topic ? getTopicProgress(topic.id) : undefined;

    // Track time spent
    useEffect(() => {
        startTimeRef.current = new Date();

        return () => {
            if (topic) {
                const seconds = Math.floor((new Date().getTime() - startTimeRef.current.getTime()) / 1000);
                if (seconds > 10) {
                    updateTopicProgress(topic.id, {});
                }
            }
        };
    }, [topic?.id]);

    if (!topic) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-4">Topic not found</h2>
                <Link to="/" className="text-primary-500 hover:underline">
                    Back to Home
                </Link>
            </div>
        );
    }

    const allCategories = [...zoneACategories, ...zoneBCategories];
    const category = allCategories.find(c => c.id === topic.category);
    const categoryTopics = allTopics.filter(t => t.category === topic.category);
    const currentIndex = categoryTopics.findIndex(t => t.id === topic.id);
    const prevTopic = currentIndex > 0 ? categoryTopics[currentIndex - 1] : null;
    const nextTopic = currentIndex < categoryTopics.length - 1 ? categoryTopics[currentIndex + 1] : null;

    const handleAnswerSelect = (mcqId: string, answerIndex: number) => {
        setSelectedAnswers(prev => ({ ...prev, [mcqId]: answerIndex }));
    };

    const handleRevealAnswer = (mcqId: string) => {
        setRevealedAnswers(prev => new Set(prev).add(mcqId));
    };

    const handleMarkComplete = () => {
        markTopicComplete(topic.id);
    };

    const handleToggleBookmark = () => {
        toggleBookmark(topic.id);
    };

    const renderMarkdown = (content: string) => {
        // Simple markdown rendering - in production use a proper library
        return content
            .split('\n\n')
            .map((block, i) => {
                if (block.startsWith('# ')) {
                    return <h1 key={i} className="text-3xl font-display font-bold text-dark-900 dark:text-white mb-6 mt-10">{block.slice(2)}</h1>;
                }
                if (block.startsWith('## ')) {
                    return <h2 key={i} className="text-2xl font-display font-semibold text-dark-800 dark:text-dark-100 mb-4 mt-8">{block.slice(3)}</h2>;
                }
                if (block.startsWith('### ')) {
                    return <h3 key={i} className="text-xl font-display font-medium text-dark-700 dark:text-dark-200 mb-3 mt-6">{block.slice(4)}</h3>;
                }
                if (block.startsWith('```')) {
                    const lines = block.split('\n');
                    const code = lines.slice(1, -1).join('\n');
                    return (
                        <pre key={i} className="font-mono text-sm p-4 rounded-xl mb-4 overflow-x-auto bg-dark-900 text-dark-100">
                            <code>{code}</code>
                        </pre>
                    );
                }
                if (block.startsWith('|')) {
                    const rows = block.split('\n').filter(r => r.trim() && !r.includes('---'));
                    return (
                        <div key={i} className="overflow-x-auto mb-4">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr>
                                        {rows[0].split('|').filter(c => c.trim()).map((cell, ci) => (
                                            <th key={ci} className="px-4 py-2 text-left font-medium bg-dark-100 dark:bg-dark-800">
                                                {cell.trim()}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.slice(1).map((row, ri) => (
                                        <tr key={ri} className="border-b border-dark-100 dark:border-dark-700">
                                            {row.split('|').filter(c => c.trim()).map((cell, ci) => (
                                                <td key={ci} className="px-4 py-2">{cell.trim()}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    );
                }
                if (block.startsWith('- ') || block.startsWith('* ')) {
                    const items = block.split('\n');
                    return (
                        <ul key={i} className="list-disc pl-6 mb-4 space-y-1">
                            {items.map((item, ii) => (
                                <li key={ii}>{item.replace(/^[-*] /, '')}</li>
                            ))}
                        </ul>
                    );
                }
                if (block.match(/^\d+\. /)) {
                    const items = block.split('\n');
                    return (
                        <ol key={i} className="list-decimal pl-6 mb-4 space-y-1">
                            {items.map((item, ii) => (
                                <li key={ii}>{item.replace(/^\d+\. /, '')}</li>
                            ))}
                        </ol>
                    );
                }
                return <p key={i} className="mb-4">{block}</p>;
            });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-dark-500 dark:text-dark-400">
                <Link to={topic.zone === 'A' ? '/zone-a' : '/zone-b'} className="hover:text-primary-500">
                    Zone {topic.zone}
                </Link>
                <ChevronRight className="w-4 h-4" />
                <Link to={`/${topic.zone === 'A' ? 'zone-a' : 'zone-b'}/${topic.category}`} className="hover:text-primary-500">
                    {category?.name}
                </Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-dark-900 dark:text-white truncate">{topic.title}</span>
            </nav>

            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <GlassCard>
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Tag variant={topic.zone === 'A' ? 'success' : 'default'}>Zone {topic.zone}</Tag>
                                {progress?.completed && <Tag variant="success">Completed</Tag>}
                            </div>
                            <h1 className="text-2xl md:text-3xl font-display font-bold text-dark-900 dark:text-white">
                                {topic.title}
                            </h1>
                            <p className="text-dark-600 dark:text-dark-300 mt-2">{topic.description}</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={handleToggleBookmark}
                                className="p-2 rounded-xl hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors"
                            >
                                {progress?.bookmarked ? (
                                    <BookmarkCheck className="w-5 h-5 text-primary-500" />
                                ) : (
                                    <Bookmark className="w-5 h-5 text-dark-400" />
                                )}
                            </button>
                            <button
                                onClick={() => setFocusMode(!focusMode)}
                                className="p-2 rounded-xl hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors"
                                title={focusMode ? 'Exit focus mode' : 'Enter focus mode'}
                            >
                                {focusMode ? (
                                    <Eye className="w-5 h-5 text-primary-500" />
                                ) : (
                                    <EyeOff className="w-5 h-5 text-dark-400" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-dark-600 dark:text-dark-400">
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            <span>{topic.estimatedTime} min read</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Target className="w-4 h-4" />
                            <span>{topic.mcqs.length} practice MCQs</span>
                        </div>
                    </div>
                </GlassCard>
            </motion.div>

            {/* Content Level Selector */}
            <div className="flex justify-center gap-2">
                {(['beginner', 'intermediate', 'advanced'] as ContentLevel[]).map((level) => (
                    <button
                        key={level}
                        onClick={() => setContentLevel(level)}
                        className={`
              px-4 py-2 rounded-xl font-medium capitalize transition-all
              ${contentLevel === level
                                ? 'bg-primary-500 text-white'
                                : 'bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-300 hover:bg-dark-200 dark:hover:bg-dark-700'
                            }
            `}
                    >
                        {level}
                    </button>
                ))}
            </div>

            {/* Main Content */}
            <motion.div
                key={contentLevel}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
            >
                <GlassCard>
                    <div className="prose-reading">
                        {renderMarkdown(topic.content[contentLevel])}
                    </div>
                </GlassCard>
            </motion.div>

            {/* Key Points */}
            <GlassCard>
                <GlassCardTitle className="text-lg mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-primary-500" />
                    Key Points to Remember
                </GlassCardTitle>
                <ul className="space-y-2">
                    {topic.keyPoints.map((point, i) => (
                        <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span className="text-dark-700 dark:text-dark-200">{point}</span>
                        </li>
                    ))}
                </ul>
            </GlassCard>

            {/* Cheatsheet */}
            <GlassCard>
                <GlassCardTitle className="text-lg mb-4">📝 Quick Cheatsheet</GlassCardTitle>
                <div className="flex flex-wrap gap-2">
                    {topic.cheatsheet.map((item, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-lg bg-dark-100 dark:bg-dark-700 text-sm font-mono">
                            {item}
                        </span>
                    ))}
                </div>
            </GlassCard>

            {/* Common Mistakes */}
            <Accordion title="Common Mistakes to Avoid" icon={AlertCircle} defaultOpen>
                <ul className="space-y-2">
                    {topic.commonMistakes.map((mistake, i) => (
                        <li key={i} className="flex items-start gap-2">
                            <span className="text-red-500">✗</span>
                            <span className="text-dark-700 dark:text-dark-200">{mistake}</span>
                        </li>
                    ))}
                </ul>
            </Accordion>

            {/* MCQs Section */}
            <GlassCard>
                <div className="flex items-center justify-between mb-4">
                    <GlassCardTitle className="text-lg flex items-center gap-2">
                        <Target className="w-5 h-5 text-primary-500" />
                        Practice MCQs ({topic.mcqs.length})
                    </GlassCardTitle>
                    <button
                        onClick={() => setShowMCQs(!showMCQs)}
                        className="flex items-center gap-1 text-primary-500 font-medium"
                    >
                        {showMCQs ? 'Hide' : 'Show'} MCQs
                        <ChevronDown className={`w-4 h-4 transition-transform ${showMCQs ? 'rotate-180' : ''}`} />
                    </button>
                </div>

                <AnimatePresence>
                    {showMCQs && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="space-y-6"
                        >
                            {topic.mcqs.map((mcq, index) => {
                                const selected = selectedAnswers[mcq.id];
                                const revealed = revealedAnswers.has(mcq.id);
                                const isCorrect = selected === mcq.correctAnswer;

                                return (
                                    <div key={mcq.id} className="p-4 rounded-xl bg-dark-50 dark:bg-dark-800/50">
                                        <div className="flex items-start gap-3 mb-4">
                                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center font-bold text-primary-600 dark:text-primary-400">
                                                {index + 1}
                                            </span>
                                            <div>
                                                <p className="font-medium text-dark-900 dark:text-white">{mcq.question}</p>
                                                <div className="flex gap-2 mt-1">
                                                    <Tag size="sm" variant={mcq.difficulty === 'easy' ? 'success' : mcq.difficulty === 'medium' ? 'warning' : 'danger'}>
                                                        {mcq.difficulty}
                                                    </Tag>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2 ml-11">
                                            {mcq.options.map((option, oi) => (
                                                <button
                                                    key={oi}
                                                    onClick={() => handleAnswerSelect(mcq.id, oi)}
                                                    disabled={revealed}
                                                    className={`
                            w-full p-3 rounded-lg text-left transition-all
                            ${selected === oi
                                                            ? revealed
                                                                ? oi === mcq.correctAnswer
                                                                    ? 'bg-emerald-100 dark:bg-emerald-900/30 border-emerald-500 border-2'
                                                                    : 'bg-red-100 dark:bg-red-900/30 border-red-500 border-2'
                                                                : 'bg-primary-100 dark:bg-primary-900/30 border-primary-500 border-2'
                                                            : revealed && oi === mcq.correctAnswer
                                                                ? 'bg-emerald-100 dark:bg-emerald-900/30 border-emerald-500 border-2'
                                                                : 'bg-white dark:bg-dark-700 border-dark-200 dark:border-dark-600 border hover:border-primary-300'
                                                        }
                          `}
                                                >
                                                    <span className="font-medium mr-2">{String.fromCharCode(65 + oi)}.</span>
                                                    {option}
                                                </button>
                                            ))}
                                        </div>

                                        {selected !== undefined && !revealed && (
                                            <div className="mt-4 ml-11">
                                                <Button size="sm" onClick={() => handleRevealAnswer(mcq.id)}>
                                                    Check Answer
                                                </Button>
                                            </div>
                                        )}

                                        {revealed && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className={`mt-4 ml-11 p-3 rounded-lg ${isCorrect ? 'bg-emerald-50 dark:bg-emerald-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}
                                            >
                                                <p className={`font-medium ${isCorrect ? 'text-emerald-700 dark:text-emerald-300' : 'text-red-700 dark:text-red-300'}`}>
                                                    {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                                                </p>
                                                <p className="text-sm mt-1 text-dark-600 dark:text-dark-300">{mcq.explanation}</p>
                                            </motion.div>
                                        )}
                                    </div>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>
            </GlassCard>

            {/* Navigation */}
            <div className="flex items-center justify-between gap-4">
                {prevTopic ? (
                    <Link to={`/topic/${prevTopic.slug}`} className="flex-1">
                        <GlassCard className="flex items-center gap-3">
                            <ChevronLeft className="w-5 h-5 text-dark-400" />
                            <div>
                                <div className="text-xs text-dark-500 dark:text-dark-400">Previous</div>
                                <div className="font-medium text-dark-900 dark:text-white truncate">{prevTopic.title}</div>
                            </div>
                        </GlassCard>
                    </Link>
                ) : <div className="flex-1" />}

                {!progress?.completed && (
                    <Button onClick={handleMarkComplete} className="flex-shrink-0">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Mark Complete
                    </Button>
                )}

                {nextTopic ? (
                    <Link to={`/topic/${nextTopic.slug}`} className="flex-1">
                        <GlassCard className="flex items-center justify-end gap-3">
                            <div className="text-right">
                                <div className="text-xs text-dark-500 dark:text-dark-400">Next</div>
                                <div className="font-medium text-dark-900 dark:text-white truncate">{nextTopic.title}</div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-dark-400" />
                        </GlassCard>
                    </Link>
                ) : <div className="flex-1" />}
            </div>
        </div>
    );
}
