// Theme types
export type ThemeMode = 'light' | 'dark' | 'night';

// Content structure
export interface Topic {
    id: string;
    title: string;
    slug: string;
    category: string;
    zone: 'A' | 'B';
    icon: string;
    description: string;
    estimatedTime: number; // in minutes
    content: {
        beginner: string;
        intermediate: string;
        advanced: string;
    };
    keyPoints: string[];
    realWorldExamples: RealWorldExample[];
    mcqs: MCQ[];
    commonMistakes: string[];
    comparisons: ComparisonTable[];
    summary: string;
    cheatsheet: string[];
    relatedTopics: string[];
}

export interface RealWorldExample {
    title: string;
    company?: string;
    scenario: string;
    solution: string;
    outcome: string;
}

export interface MCQ {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    difficulty: 'easy' | 'medium' | 'hard';
    tags: string[];
}

export interface ComparisonTable {
    title: string;
    headers: string[];
    rows: string[][];
}

// Category structure
export interface Category {
    id: string;
    name: string;
    icon: string;
    description: string;
    zone: 'A' | 'B';
    topics: string[]; // topic IDs
    color: string;
}

// Progress tracking
export interface TopicProgress {
    topicId: string;
    completed: boolean;
    masteryLevel: number; // 0-100
    lastAccessed: Date;
    timeSpent: number; // in seconds
    quizScores: QuizScore[];
    bookmarked: boolean;
    notes: string;
}

export interface QuizScore {
    date: Date;
    score: number;
    totalQuestions: number;
    difficulty: 'easy' | 'medium' | 'hard';
    timeSpent: number;
}

export interface UserProgress {
    overallMastery: number;
    zoneAProgress: number;
    zoneBProgress: number;
    currentStreak: number;
    longestStreak: number;
    lastActiveDate: Date;
    totalTimeSpent: number;
    topicsCompleted: number;
    quizzesTaken: number;
    averageQuizScore: number;
}

// Quiz engine types
export interface QuizSession {
    id: string;
    startTime: Date;
    endTime?: Date;
    questions: MCQ[];
    answers: number[];
    currentIndex: number;
    mode: 'practice' | 'timed' | 'exam';
    difficulty: 'easy' | 'medium' | 'hard' | 'adaptive';
    topicFilters: string[];
    score?: number;
}

// Analytics types
export interface DailyActivity {
    date: string; // YYYY-MM-DD
    timeSpent: number;
    topicsViewed: number;
    quizzesTaken: number;
    questionsAnswered: number;
    correctAnswers: number;
}

export interface WeakTopic {
    topicId: string;
    topicTitle: string;
    averageScore: number;
    attempts: number;
    lastAttempt: Date;
}

// Previous years analytics
export interface PreviousYearQuestion {
    id: string;
    year: number;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    topicId: string;
    frequency: number; // how often this topic appears
    tags: string[];
}

export interface TopicFrequency {
    topicId: string;
    topicTitle: string;
    frequency: number;
    trend: 'up' | 'down' | 'stable';
    years: { year: number; count: number }[];
}

// Navigation
export interface NavItem {
    id: string;
    label: string;
    icon: string;
    path: string;
    badge?: number;
}

// Search
export interface SearchResult {
    type: 'topic' | 'mcq' | 'category';
    id: string;
    title: string;
    description: string;
    path: string;
    zone?: 'A' | 'B';
}
