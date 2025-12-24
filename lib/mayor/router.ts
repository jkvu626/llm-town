import { Message, AgentRole, Project } from "@/types";

/*
    Discrete controller for simple requests. If discrete action can't be found hand over to lib/mayor/llm.ts
*/


// Keywords that indicate which agent should handle requests.
const ROUTING_PATTERNS: Record<AgentRole, string[]> = {
  engineer: [
    'code', 'build', 'implement', 'fix', 'bug', 'feature',
    'api', 'database', 'function'
  ],
  secretary: [
    'schedule', 'todo', 'note', 'remind', 'calendar',
    'meeting', 'task list'
  ],
  artist: [
    'image', 'design', 'visual', 'icon', 'illustration',
    'graphic', 'logo'
  ],
  curator: [
    'archive', 'history', 'previous project', 'what did we',
    'remember when'
  ],
  mayor: [
    'project', 'plan', 'scope', 'decision', 'should we',
    'strategy', 'goal'
  ]
};

export type RoutingDecision = {
    confidence: 'high' | 'medium' | 'low';
    target: AgentRole | 'town_hall' | 'llm_required';
    reason: string;
};

export function routeMessage(
    message: string,
    project: Project | null
) : RoutingDecision {
    const lowerMessage = message.toLowerCase();

    // Check for explicit agent mentions
    if (lowerMessage.includes('@engineer')) {
        return { confidence: 'high', target: 'engineer', reason: 'Explicit mention' };
    }
    if (lowerMessage.includes('@secretary')) {
        return { confidence: 'high', target: 'secretary', reason: 'Explicit mention' };
    }
    if (lowerMessage.includes('@artist')) {
        return { confidence: 'high', target: 'artist', reason: 'Explicit mention' };
    }
    if (lowerMessage.includes('@curator')) {
        return { confidence: 'high', target: 'curator', reason: 'Explicit mention' };
    }

    // Score each agent on keyword matches
    const scores: Record<AgentRole, number> = {
        mayor: 0, engineer: 0, secretary: 0, artist: 0, curator: 0
    };

    for (const [agent, patterns] of Object.entries(ROUTING_PATTERNS)) {
        for (const pattern of patterns) {
            if (lowerMessage.includes(pattern)) {
                scores[agent as AgentRole]++;
            }
        }
    }

    // Highest scoring agent
    const topAgent = Object.entries(scores)
        .sort(([,a], [,b]) => b - a)[0];

    if (topAgent[1] >= 2) {
        return { confidence: 'high', target: topAgent[0] as AgentRole, reason: "Multiple keyword matches" }
    } else if (topAgent[1] === 1) {
        return { confidence: 'medium', target: topAgent[0] as AgentRole, reason: "Single keyword match"}
    }

    // No clear match - needs LLM to interpret
    return { confidence: 'low', target: 'llm_required', reason: 'No clear routing signal'}
};