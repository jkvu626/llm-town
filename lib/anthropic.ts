import Anthropic from '@anthropic-ai/sdk';

// Runs on server side (API Routes)
export const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

// Model selection based on task complexity
export const MODELS = {
    // For nuanced decisions, complex reasoning
    advanced: 'claude-sonnet-4-20250514',
    // For routine tasks, faster responses
    standard: 'claude-haiku-4-20250514',
  } as const;