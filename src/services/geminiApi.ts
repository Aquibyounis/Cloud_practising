const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

interface GenerateQuizParams {
    topic: string;
    difficulty: 'easy' | 'medium' | 'hard';
    count: number;
}

interface GeneratedMCQ {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
}

export async function generateQuizWithGemini(params: GenerateQuizParams): Promise<GeneratedMCQ[]> {
    if (!GEMINI_API_KEY) {
        throw new Error('Gemini API key not configured');
    }

    const prompt = `Generate ${params.count} multiple choice questions about "${params.topic}" in cloud computing.
Difficulty level: ${params.difficulty}

For each question, provide:
1. A clear question
2. Exactly 4 answer options (A, B, C, D)
3. The index of the correct answer (0-3)
4. A brief explanation of why the answer is correct

Format your response as a valid JSON array with this structure:
[
  {
    "question": "Question text here",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 0,
    "explanation": "Explanation here"
  }
]

Focus on practical, interview-relevant questions. Include some trap questions that test understanding vs memorization.
Only respond with the JSON array, no additional text.`;

    try {
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 2048,
                }
            }),
        });

        if (!response.ok) {
            throw new Error(`Gemini API error: ${response.status}`);
        }

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) {
            throw new Error('No response from Gemini');
        }

        // Extract JSON from the response (handle markdown code blocks)
        let jsonStr = text.trim();
        if (jsonStr.startsWith('```json')) {
            jsonStr = jsonStr.slice(7);
        }
        if (jsonStr.startsWith('```')) {
            jsonStr = jsonStr.slice(3);
        }
        if (jsonStr.endsWith('```')) {
            jsonStr = jsonStr.slice(0, -3);
        }
        jsonStr = jsonStr.trim();

        const mcqs: GeneratedMCQ[] = JSON.parse(jsonStr);
        return mcqs;
    } catch (error) {
        console.error('Error generating quiz with Gemini:', error);
        throw error;
    }
}

export function isGeminiConfigured(): boolean {
    return !!GEMINI_API_KEY;
}
