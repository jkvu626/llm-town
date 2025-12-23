// Project types
export interface Project {
    id: string;
    name: string;
    description: string | null;
    status: 'active' | 'paused' | 'archived';
    mode: 'full_service' | 'consultancy';
    phase: string;
    summary: string | null;
    created_at: string;
    updated_at: string;
}

// Message types
export interface Message {
    id: string;
    project_id: string;
    content: string;
    agent: string | null;
    role: 'user' | 'assistant' | 'system';
    metadata: Record<string, any>;
    created_at: string;
}

// Task types - what agents work on
export interface Task {
    id: string;
    project_id: string;
    description: string;
    owner: AgentRole;
    status: 'pending' | 'in_progress' | 'blocked' | 'complete';
    blocker: Blocker | null;
}

// When an agent can't proceed
export interface Blocker {
    type: 'missing_info' | 'dependency' | 'decision_required' |
    'conflict' | 'technical';
    description: string;
    question?: string;
    options?: string[];
    suggested?: string;
    rationale?: string;
}

// Default Agent definitions
export type AgentRole = 'mayor' | 'engineer' | 'secretary' | 'artist'
| 'curator';

export interface Agent {
    role: AgentRole;
    name: string;
    color: string;
    accessory: string;
    description: string;
    capabilities: string[];
}

// Task assignment: Mayor -> Resident
export interface TaskAssignment {
    task_id: string;
    type: string;
    description: string;
    context: {
        project_summary: string;
        relevant_descisions: Decision[];
        related_artifacts: string[];
    };
    scope: {
        autonomy: 'task' | 'feature' | "phase";
        boundaries: string[];
        check_in_triggers: string[];
    }
}

// Response: Resident -> Mayor
export interface TaskResponse {
    task_id: string;
    status: 'complete' | "in_progress" | "blocked";
    output?: {
        files?: Array<{path: string; content: string}>;
        message?: string;
    }
    blocker?: Blocker;
    suggested_next?: string;
}

// Decision types
export interface Decision {
    id: string;
    task_id: string;
    content: string;
}