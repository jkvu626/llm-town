import { Agent } from "@/types";

export const AGENTS: Record<string, Agent> = {
    mayor: {
        role:'mayor',
        name: 'Mayor',
        color: 'indigo',
        accessory: 'top hat',
        description: 'Orchestrates the town, routes tasks, makes highlevel decisions',
        capabilities: ['project_planning', 'task_routing',
        'conflict_resolution', 'user_communication']
        },
    engineer: {
        role: 'engineer',
        name: 'Engineer',
        color: 'orange',
        accessory: 'hard hat',
        description: 'Handles all code-related tasks, from architecture to implementation',
        capabilities: ['code_generation', 'code_review', 'architecture','debugging']
        },
    secretary: {
        role: 'secretary',
        name: 'Secretary',
        color: 'teal',
        accessory: 'glasses',
        description: 'Manages productivity tools, notes, todos, and external integrations',
        capabilities: ['note_taking', 'task_tracking', 'calendar','external_tools']        
        },
        artist: {
            role: 'artist',
            name: 'Artist',
            color: 'purple',
            accessory: 'paintbrush',
            description: 'Creates visual assets, images, and designs',
            capabilities: ['image_generation', 'design', 'visual_assets']
        },
        curator: {
            role: 'curator',
            name: 'Curator',
            color: 'rose',
            accessory: 'mustache',
            description: 'Maintains the project museum, provides historical context',
            capabilities: ['archiving', 'project_history', 'context_retrieval']
        }
};  
