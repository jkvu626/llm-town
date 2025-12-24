import { anthropic, MODELS } from '../anthropic';
import { MAYOR_SYSTEM_PROMPT } from './prompts';
import { Project, Message } from '@/types';

export async function interpretLLM(
    userMessage: string,
    project: Project | null,
    recentMessages: Message[]
) {
    const response = await anthropic.messages.create({
        model: MODELS.advanced,
        max_tokens: 1024,
        system: MAYOR_SYSTEM_PROMPT,
        messages : [
            // Recent context
            ...recentMessages.slice(-10).map(m => ({
                role: m.role as 'user' | 'assistant', 
                content: m.content
            })),
            { role: 'user', content: userMessage }
        ]
    });

    return response.content[0].type === 'text'
        ? response.content[0].text
        : '';
}