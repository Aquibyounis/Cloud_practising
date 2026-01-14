import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Brain,
    Play,
    Clock,
    Target,
    ChevronRight,
    CheckCircle,
    XCircle,
    RotateCcw,
    Trophy,
    Zap,
} from 'lucide-react';
import { GlassCard, GlassCardTitle } from '../components/ui/GlassCard';
import { Button, Tag, ProgressBar, RadioGroup } from '../components/ui/Components';
import { useProgress } from '../contexts/ProgressContext';
import { getRandomMCQs, allTopics } from '../data';
import { zoneACategories, zoneBCategories } from '../data/categories';
import type { MCQ } from '../types';

type QuizState = 'setup' | 'playing' | 'review';
type Difficulty = 'easy' | 'medium' | 'hard' | 'mixed';

interface QuizMCQ extends MCQ {
    topicId: string;
    topicTitle: string;
}

export default function Quiz() {
    const { addQuizScore, recordDailyActivity } = useProgress();

    const [quizState, setQuizState] = useState<QuizState>('setup');
    const [difficulty, setDifficulty] = useState<Difficulty>('mixed');
    const [questionCount, setQuestionCount] = useState(10);
    const [selectedZone, setSelectedZone] = useState<'A' | 'B' | 'all'>('all');
    const [timedMode, setTimedMode] = useState(false);
    const [timePerQuestion, setTimePerQuestion] = useState(30);

    const [questions, setQuestions] = useState<QuizMCQ[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<(number | null)[]>([]);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [startTime, setStartTime] = useState<Date | null>(null);

    // Timer effect
    useEffect(() => {
        if (quizState === 'playing' && timedMode && timeRemaining > 0) {
            const timer = setTimeout(() => {
                setTimeRemaining(timeRemaining - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (timedMode && timeRemaining === 0 && quizState === 'playing') {
            handleNextQuestion(null);
        }
    }, [timeRemaining, quizState, timedMode]);

    const startQuiz = () => {
        const diffFilter = difficulty === 'mixed' ? undefined : difficulty;
        const zoneFilter = selectedZone === 'all' ? undefined : selectedZone;

        const mcqs = getRandomMCQs(questionCount, {
            zone: zoneFilter,
            difficulty: diffFilter,
        }) as QuizMCQ[];

        if (mcqs.length === 0) {
            alert('No questions available with current filters. Try different settings.');
            return;
        }

        setQuestions(mcqs);
        setAnswers(new Array(mcqs.length).fill(null));
        setCurrentIndex(0);
        setStartTime(new Date());
        if (timedMode) setTimeRemaining(timePerQuestion);
        setQuizState('playing');
    };

    const handleNextQuestion = (answer: number | null) => {
        const newAnswers = [...answers];
        newAnswers[currentIndex] = answer;
        setAnswers(newAnswers);

        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
            if (timedMode) setTimeRemaining(timePerQuestion);
        } else {
            finishQuiz(newAnswers);
        }
    };

    const finishQuiz = async (finalAnswers: (number | null)[]) => {
        setQuizState('review');

        const correctCount = finalAnswers.filter((a, i) => a === questions[i].correctAnswer).length;
        const totalTime = startTime ? Math.floor((new Date().getTime() - startTime.getTime()) / 1000) : 0;

        // Record quiz for each topic
        const topicScores = new Map<string, { correct: number; total: number }>();
        questions.forEach((q, i) => {
            const existing = topicScores.get(q.topicId) || { correct: 0, total: 0 };
            existing.total++;
            if (finalAnswers[i] === q.correctAnswer) existing.correct++;
            topicScores.set(q.topicId, existing);
        });

        for (const [topicId, scores] of topicScores) {
            await addQuizScore(topicId, {
                date: new Date(),
                score: scores.correct,
                totalQuestions: scores.total,
                difficulty: difficulty === 'mixed' ? 'medium' : difficulty,
                timeSpent: Math.floor(totalTime / questions.length) * scores.total,
            });
        }

        await recordDailyActivity({
            quizzesTaken: 1,
            questionsAnswered: questions.length,
            correctAnswers: correctCount,
        });
    };

    const resetQuiz = () => {
        setQuizState('setup');
        setQuestions([]);
        setAnswers([]);
        setCurrentIndex(0);
        setStartTime(null);
    };

    const currentQuestion = questions[currentIndex];
    const score = answers.filter((a, i) => a === questions[i]?.correctAnswer).length;

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <GlassCard glow>
                    <div className="flex items-center gap-4">
                        <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                            <Brain className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-display font-bold text-dark-900 dark:text-white">
                                Quiz Engine
                            </h1>
                            <p className="text-dark-600 dark:text-dark-300">
                                Test your cloud knowledge with practice MCQs
                            </p>
                        </div>
                    </div>
                </GlassCard>
            </motion.div>

            <AnimatePresence mode="wait">
                {/* Setup State */}
                {quizState === 'setup' && (
                    <motion.div
                        key="setup"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <GlassCard>
                            <GlassCardTitle className="text-lg mb-6">Quiz Settings</GlassCardTitle>

                            {/* Zone Selection */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-dark-700 dark:text-dark-200 mb-2">
                                    Select Zone
                                </label>
                                <div className="flex gap-2">
                                    {[
                                        { value: 'all', label: 'All Zones' },
                                        { value: 'A', label: 'Zone A' },
                                        { value: 'B', label: 'Zone B' },
                                    ].map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => setSelectedZone(option.value as typeof selectedZone)}
                                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedZone === option.value
                                                    ? 'bg-primary-500 text-white'
                                                    : 'bg-dark-100 dark:bg-dark-700 text-dark-600 dark:text-dark-300'
                                                }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Difficulty */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-dark-700 dark:text-dark-200 mb-2">
                                    Difficulty
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        { value: 'easy', label: 'Easy', color: 'bg-emerald-500' },
                                        { value: 'medium', label: 'Medium', color: 'bg-amber-500' },
                                        { value: 'hard', label: 'Hard', color: 'bg-red-500' },
                                        { value: 'mixed', label: 'Mixed', color: 'bg-purple-500' },
                                    ].map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => setDifficulty(option.value as Difficulty)}
                                            className={`px-4 py-2 rounded-lg font-medium transition-all ${difficulty === option.value
                                                    ? `${option.color} text-white`
                                                    : 'bg-dark-100 dark:bg-dark-700 text-dark-600 dark:text-dark-300'
                                                }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Question Count */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-dark-700 dark:text-dark-200 mb-2">
                                    Number of Questions: {questionCount}
                                </label>
                                <input
                                    type="range"
                                    min="5"
                                    max="30"
                                    step="5"
                                    value={questionCount}
                                    onChange={(e) => setQuestionCount(Number(e.target.value))}
                                    className="w-full"
                                />
                            </div>

                            {/* Timed Mode */}
                            <div className="mb-6">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={timedMode}
                                        onChange={(e) => setTimedMode(e.target.checked)}
                                        className="w-5 h-5 rounded border-dark-300"
                                    />
                                    <span className="font-medium text-dark-700 dark:text-dark-200">
                                        Timed Mode ({timePerQuestion}s per question)
                                    </span>
                                </label>
                            </div>
                        </GlassCard>

                        <Button onClick={startQuiz} icon={Play} className="w-full">
                            Start Quiz
                        </Button>
                    </motion.div>
                )}

                {/* Playing State */}
                {quizState === 'playing' && currentQuestion && (
                    <motion.div
                        key="playing"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        {/* Progress */}
                        <GlassCard padding="sm">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-dark-600 dark:text-dark-400">
                                    Question {currentIndex + 1} of {questions.length}
                                </span>
                                {timedMode && (
                                    <div className={`flex items-center gap-1 ${timeRemaining <= 10 ? 'text-red-500' : 'text-dark-600 dark:text-dark-400'}`}>
                                        <Clock className="w-4 h-4" />
                                        <span className="font-mono">{timeRemaining}s</span>
                                    </div>
                                )}
                            </div>
                            <ProgressBar value={currentIndex + 1} max={questions.length} />
                        </GlassCard>

                        {/* Question */}
                        <GlassCard>
                            <div className="flex items-center gap-2 mb-4">
                                <Tag size="sm">{currentQuestion.topicTitle}</Tag>
                                <Tag size="sm" variant={
                                    currentQuestion.difficulty === 'easy' ? 'success' :
                                        currentQuestion.difficulty === 'medium' ? 'warning' : 'danger'
                                }>
                                    {currentQuestion.difficulty}
                                </Tag>
                            </div>

                            <p className="text-lg font-medium text-dark-900 dark:text-white mb-6">
                                {currentQuestion.question}
                            </p>

                            <div className="space-y-3">
                                {currentQuestion.options.map((option, index) => (
                                    <motion.button
                                        key={index}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleNextQuestion(index)}
                                        className="w-full p-4 rounded-xl text-left border-2 border-dark-200 dark:border-dark-600 
                               hover:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20
                               transition-all"
                                    >
                                        <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                                        {option}
                                    </motion.button>
                                ))}
                            </div>
                        </GlassCard>
                    </motion.div>
                )}

                {/* Review State */}
                {quizState === 'review' && (
                    <motion.div
                        key="review"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        {/* Score Card */}
                        <GlassCard glow>
                            <div className="text-center">
                                <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-primary-500 to-accent-purple mb-4">
                                    <Trophy className="w-10 h-10 text-white" />
                                </div>
                                <h2 className="text-3xl font-display font-bold text-dark-900 dark:text-white mb-2">
                                    {score} / {questions.length}
                                </h2>
                                <p className="text-dark-600 dark:text-dark-300">
                                    {score === questions.length ? 'Perfect Score! 🎉' :
                                        score >= questions.length * 0.8 ? 'Excellent Work! 🌟' :
                                            score >= questions.length * 0.6 ? 'Good Job! 👍' :
                                                'Keep Practicing! 💪'}
                                </p>
                                <div className="mt-4">
                                    <ProgressBar
                                        value={score}
                                        max={questions.length}
                                        color={score >= questions.length * 0.7 ? 'success' : 'warning'}
                                    />
                                </div>
                            </div>
                        </GlassCard>

                        {/* Answers Review */}
                        <GlassCard>
                            <GlassCardTitle className="text-lg mb-4">Review Answers</GlassCardTitle>
                            <div className="space-y-4">
                                {questions.map((q, i) => {
                                    const userAnswer = answers[i];
                                    const isCorrect = userAnswer === q.correctAnswer;

                                    return (
                                        <div key={q.id} className="p-4 rounded-xl bg-dark-50 dark:bg-dark-800/50">
                                            <div className="flex items-start gap-3">
                                                {isCorrect ? (
                                                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-1" />
                                                ) : (
                                                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                                                )}
                                                <div className="flex-1">
                                                    <p className="font-medium text-dark-900 dark:text-white mb-2">{q.question}</p>
                                                    {userAnswer !== null && userAnswer !== q.correctAnswer && (
                                                        <p className="text-sm text-red-600 dark:text-red-400 mb-1">
                                                            Your answer: {q.options[userAnswer]}
                                                        </p>
                                                    )}
                                                    <p className="text-sm text-emerald-600 dark:text-emerald-400">
                                                        Correct: {q.options[q.correctAnswer]}
                                                    </p>
                                                    <p className="text-sm text-dark-500 dark:text-dark-400 mt-2">
                                                        {q.explanation}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </GlassCard>

                        <Button onClick={resetQuiz} icon={RotateCcw} className="w-full">
                            Take Another Quiz
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
