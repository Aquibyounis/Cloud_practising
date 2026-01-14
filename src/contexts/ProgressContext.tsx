import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import type { TopicProgress, UserProgress, DailyActivity, QuizScore } from '../types';
import { openDB, IDBPDatabase } from 'idb';

interface ProgressContextType {
    userProgress: UserProgress;
    topicProgress: Map<string, TopicProgress>;
    dailyActivities: DailyActivity[];
    updateTopicProgress: (topicId: string, updates: Partial<TopicProgress>) => Promise<void>;
    markTopicComplete: (topicId: string) => Promise<void>;
    addQuizScore: (topicId: string, score: QuizScore) => Promise<void>;
    recordTimeSpent: (topicId: string, seconds: number) => Promise<void>;
    recordDailyActivity: (activity: Partial<DailyActivity>) => Promise<void>;
    getTopicProgress: (topicId: string) => TopicProgress | undefined;
    toggleBookmark: (topicId: string) => Promise<void>;
    exportProgress: () => Promise<string>;
    resetProgress: () => Promise<void>;
    isLoaded: boolean;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const DB_NAME = 'cloudverse-db';
const DB_VERSION = 1;

const defaultUserProgress: UserProgress = {
    overallMastery: 0,
    zoneAProgress: 0,
    zoneBProgress: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDate: new Date(),
    totalTimeSpent: 0,
    topicsCompleted: 0,
    quizzesTaken: 0,
    averageQuizScore: 0,
};

async function initDB(): Promise<IDBPDatabase> {
    return openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('topicProgress')) {
                db.createObjectStore('topicProgress', { keyPath: 'topicId' });
            }
            if (!db.objectStoreNames.contains('userProgress')) {
                db.createObjectStore('userProgress', { keyPath: 'id' });
            }
            if (!db.objectStoreNames.contains('dailyActivity')) {
                db.createObjectStore('dailyActivity', { keyPath: 'date' });
            }
        },
    });
}

export function ProgressProvider({ children }: { children: ReactNode }) {
    const [db, setDb] = useState<IDBPDatabase | null>(null);
    const [userProgress, setUserProgress] = useState<UserProgress>(defaultUserProgress);
    const [topicProgress, setTopicProgress] = useState<Map<string, TopicProgress>>(new Map());
    const [dailyActivities, setDailyActivities] = useState<DailyActivity[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        initDB().then(async (database) => {
            setDb(database);

            // Load user progress
            const savedUserProgress = await database.get('userProgress', 'main');
            if (savedUserProgress) {
                setUserProgress(savedUserProgress);
            }

            // Load topic progress
            const allTopicProgress = await database.getAll('topicProgress');
            const progressMap = new Map<string, TopicProgress>();
            allTopicProgress.forEach((tp: TopicProgress) => {
                progressMap.set(tp.topicId, tp);
            });
            setTopicProgress(progressMap);

            // Load daily activities (last 90 days)
            const activities = await database.getAll('dailyActivity');
            setDailyActivities(activities.slice(-90));

            // Check and update streak
            updateStreak(savedUserProgress || defaultUserProgress, database);

            setIsLoaded(true);
        });
    }, []);

    const updateStreak = async (progress: UserProgress, database: IDBPDatabase) => {
        const today = new Date().toISOString().split('T')[0];
        const lastActive = new Date(progress.lastActiveDate).toISOString().split('T')[0];

        let newProgress = { ...progress };

        if (today !== lastActive) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];

            if (lastActive === yesterdayStr) {
                newProgress.currentStreak += 1;
                newProgress.longestStreak = Math.max(newProgress.longestStreak, newProgress.currentStreak);
            } else if (lastActive !== today) {
                newProgress.currentStreak = 1;
            }

            newProgress.lastActiveDate = new Date();
            await database.put('userProgress', { ...newProgress, id: 'main' });
            setUserProgress(newProgress);
        }
    };

    const updateTopicProgress = useCallback(async (topicId: string, updates: Partial<TopicProgress>) => {
        if (!db) return;

        const existing = topicProgress.get(topicId) || {
            topicId,
            completed: false,
            masteryLevel: 0,
            lastAccessed: new Date(),
            timeSpent: 0,
            quizScores: [],
            bookmarked: false,
            notes: '',
        };

        const updated = { ...existing, ...updates, lastAccessed: new Date() };
        await db.put('topicProgress', updated);

        setTopicProgress(prev => {
            const newMap = new Map(prev);
            newMap.set(topicId, updated);
            return newMap;
        });
    }, [db, topicProgress]);

    const markTopicComplete = useCallback(async (topicId: string) => {
        await updateTopicProgress(topicId, { completed: true, masteryLevel: 100 });

        if (db) {
            const newTopicsCompleted = userProgress.topicsCompleted + 1;
            const updatedUserProgress = { ...userProgress, topicsCompleted: newTopicsCompleted };
            await db.put('userProgress', { ...updatedUserProgress, id: 'main' });
            setUserProgress(updatedUserProgress);
        }
    }, [db, userProgress, updateTopicProgress]);

    const addQuizScore = useCallback(async (topicId: string, score: QuizScore) => {
        const existing = topicProgress.get(topicId);
        const quizScores = existing?.quizScores || [];
        quizScores.push(score);

        // Calculate new mastery level
        const avgScore = quizScores.reduce((sum, s) => sum + (s.score / s.totalQuestions) * 100, 0) / quizScores.length;

        await updateTopicProgress(topicId, { quizScores, masteryLevel: Math.round(avgScore) });

        if (db) {
            const newQuizzesTaken = userProgress.quizzesTaken + 1;
            const newAvgScore = ((userProgress.averageQuizScore * userProgress.quizzesTaken) + (score.score / score.totalQuestions) * 100) / newQuizzesTaken;
            const updatedUserProgress = {
                ...userProgress,
                quizzesTaken: newQuizzesTaken,
                averageQuizScore: newAvgScore
            };
            await db.put('userProgress', { ...updatedUserProgress, id: 'main' });
            setUserProgress(updatedUserProgress);
        }
    }, [db, userProgress, topicProgress, updateTopicProgress]);

    const recordTimeSpent = useCallback(async (topicId: string, seconds: number) => {
        const existing = topicProgress.get(topicId);
        const newTimeSpent = (existing?.timeSpent || 0) + seconds;
        await updateTopicProgress(topicId, { timeSpent: newTimeSpent });

        if (db) {
            const updatedUserProgress = {
                ...userProgress,
                totalTimeSpent: userProgress.totalTimeSpent + seconds
            };
            await db.put('userProgress', { ...updatedUserProgress, id: 'main' });
            setUserProgress(updatedUserProgress);
        }
    }, [db, userProgress, topicProgress, updateTopicProgress]);

    const recordDailyActivity = useCallback(async (activity: Partial<DailyActivity>) => {
        if (!db) return;

        const today = new Date().toISOString().split('T')[0];
        const existing = await db.get('dailyActivity', today);

        const updated: DailyActivity = {
            date: today,
            timeSpent: (existing?.timeSpent || 0) + (activity.timeSpent || 0),
            topicsViewed: (existing?.topicsViewed || 0) + (activity.topicsViewed || 0),
            quizzesTaken: (existing?.quizzesTaken || 0) + (activity.quizzesTaken || 0),
            questionsAnswered: (existing?.questionsAnswered || 0) + (activity.questionsAnswered || 0),
            correctAnswers: (existing?.correctAnswers || 0) + (activity.correctAnswers || 0),
        };

        await db.put('dailyActivity', updated);

        setDailyActivities(prev => {
            const filtered = prev.filter(a => a.date !== today);
            return [...filtered, updated].slice(-90);
        });
    }, [db]);

    const getTopicProgress = useCallback((topicId: string) => {
        return topicProgress.get(topicId);
    }, [topicProgress]);

    const toggleBookmark = useCallback(async (topicId: string) => {
        const existing = topicProgress.get(topicId);
        await updateTopicProgress(topicId, { bookmarked: !existing?.bookmarked });
    }, [topicProgress, updateTopicProgress]);

    const exportProgress = useCallback(async (): Promise<string> => {
        const data = {
            userProgress,
            topicProgress: Array.from(topicProgress.entries()),
            dailyActivities,
            exportDate: new Date().toISOString(),
        };
        return JSON.stringify(data, null, 2);
    }, [userProgress, topicProgress, dailyActivities]);

    const resetProgress = useCallback(async () => {
        if (!db) return;

        await db.clear('topicProgress');
        await db.clear('userProgress');
        await db.clear('dailyActivity');

        setUserProgress(defaultUserProgress);
        setTopicProgress(new Map());
        setDailyActivities([]);
    }, [db]);

    return (
        <ProgressContext.Provider value={{
            userProgress,
            topicProgress,
            dailyActivities,
            updateTopicProgress,
            markTopicComplete,
            addQuizScore,
            recordTimeSpent,
            recordDailyActivity,
            getTopicProgress,
            toggleBookmark,
            exportProgress,
            resetProgress,
            isLoaded,
        }}>
            {children}
        </ProgressContext.Provider>
    );
}

export function useProgress() {
    const context = useContext(ProgressContext);
    if (!context) {
        throw new Error('useProgress must be used within a ProgressProvider');
    }
    return context;
}
