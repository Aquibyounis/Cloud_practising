import type { Topic } from '../types';
import cloudFundamentalsTopics from './topics/cloudFundamentals';
import serviceModelsTopics from './topics/serviceModels';
import deploymentModelsTopics from './topics/deploymentModels';
import awsCoreTopics from './topics/awsCore';
import networkingTopics from './topics/networking';
import securityTopics from './topics/security';
import virtualizationTopics from './topics/virtualization';
import pricingTopics from './topics/pricing';
import devopsTopics from './topics/devops';
import comparisonTopics from './topics/comparisons';
import zoneBComputeTopics from './topics/zoneBCompute';
import zoneBArchitectureTopics from './topics/zoneBArchitecture';
import zoneBSecurityTopics from './topics/zoneBSecurity';

// Combine all topics
export const allTopics: Topic[] = [
    // Zone A topics
    ...cloudFundamentalsTopics,
    ...serviceModelsTopics,
    ...deploymentModelsTopics,
    ...awsCoreTopics,
    ...networkingTopics,
    ...securityTopics,
    ...virtualizationTopics,
    ...pricingTopics,
    ...devopsTopics,
    ...comparisonTopics,
    // Zone B topics
    ...zoneBComputeTopics,
    ...zoneBArchitectureTopics,
    ...zoneBSecurityTopics,
];

// Create a map for quick lookup by ID
export const topicsMap = new Map<string, Topic>(
    allTopics.map(topic => [topic.id, topic])
);

// Get topics by zone
export function getTopicsByZone(zone: 'A' | 'B'): Topic[] {
    return allTopics.filter(topic => topic.zone === zone);
}

// Get topics by category
export function getTopicsByCategory(categoryId: string): Topic[] {
    return allTopics.filter(topic => topic.category === categoryId);
}

// Get topic by ID
export function getTopicById(id: string): Topic | undefined {
    return topicsMap.get(id);
}

// Get topic by slug
export function getTopicBySlug(slug: string): Topic | undefined {
    return allTopics.find(topic => topic.slug === slug);
}

// Search topics
export function searchTopics(query: string): Topic[] {
    const lowerQuery = query.toLowerCase();
    return allTopics.filter(topic =>
        topic.title.toLowerCase().includes(lowerQuery) ||
        topic.description.toLowerCase().includes(lowerQuery) ||
        topic.keyPoints.some(point => point.toLowerCase().includes(lowerQuery)) ||
        topic.cheatsheet.some(item => item.toLowerCase().includes(lowerQuery))
    );
}

// Get all MCQs from all topics
export function getAllMCQs() {
    return allTopics.flatMap(topic =>
        topic.mcqs.map(mcq => ({ ...mcq, topicId: topic.id, topicTitle: topic.title }))
    );
}

// Get MCQs by difficulty
export function getMCQsByDifficulty(difficulty: 'easy' | 'medium' | 'hard') {
    return getAllMCQs().filter(mcq => mcq.difficulty === difficulty);
}

// Get random MCQs for quiz
export function getRandomMCQs(count: number, options?: {
    zone?: 'A' | 'B';
    category?: string;
    difficulty?: 'easy' | 'medium' | 'hard';
}): ReturnType<typeof getAllMCQs> {
    let mcqs = getAllMCQs();

    if (options?.zone) {
        const zoneTopics = allTopics.filter(t => t.zone === options.zone);
        const zoneTopicIds = new Set(zoneTopics.map(t => t.id));
        mcqs = mcqs.filter(mcq => zoneTopicIds.has(mcq.topicId));
    }

    if (options?.category) {
        mcqs = mcqs.filter(mcq => {
            const topic = topicsMap.get(mcq.topicId);
            return topic && topic.category === options.category;
        });
    }

    if (options?.difficulty) {
        mcqs = mcqs.filter(mcq => mcq.difficulty === options.difficulty);
    }

    // Shuffle and return requested count
    const shuffled = mcqs.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

// Get topic stats
export function getTopicStats() {
    const zoneA = allTopics.filter(t => t.zone === 'A');
    const zoneB = allTopics.filter(t => t.zone === 'B');
    const totalMCQs = getAllMCQs().length;
    const totalTime = allTopics.reduce((sum, t) => sum + t.estimatedTime, 0);

    return {
        totalTopics: allTopics.length,
        zoneATopics: zoneA.length,
        zoneBTopics: zoneB.length,
        totalMCQs,
        totalTime,
        categories: new Set(allTopics.map(t => t.category)).size,
    };
}

export {
    cloudFundamentalsTopics,
    serviceModelsTopics,
    deploymentModelsTopics,
    awsCoreTopics,
    networkingTopics,
    securityTopics,
    virtualizationTopics,
    pricingTopics,
    devopsTopics,
    comparisonTopics,
    zoneBComputeTopics,
    zoneBArchitectureTopics,
    zoneBSecurityTopics,
};
