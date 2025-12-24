import { routeMessage, RoutingDecision } from './router';
import { interpretLLM } from './llm';
import { supabase } from '../supabase';
import { Project, Message, Task } from '@/types';

export class Mayor {
    private project: Project | null = null;

    async handleMessage(userMessage: string, projectId? : string ) {
        // Load context if there is a project
        if (projectId) {
            const { data } = await supabase
                .from('projects')
                .select('*')
                .eq('id', projectId)
                .single();
            this.project = data;
        }

        // Try deterministic routing first
        const routingDecision = routeMessage(userMessage, this.project);

        if (routingDecision.confidence === 'high') {
            return this.executeRoute(routingDecision, userMessage);
        }

        // LLM Fallback
        if (routingDecision.target === 'llm_required') {
            const recentMessage = await this.getRecentMessages(projectId);
            return interpretLLM(userMessage, this.project, recentMessage);
        }

        // Medium confidence
        return this.executeRoute(routingDecision, userMessage);
    }

    private async executeRoute(decision: RoutingDecision, message: string) {
        return {
            routing: decision,
            message: `Routing to ${decision.target}: ${decision.reason}`
        };
    }

    private async getRecentMessages(projectId? : string):Promise<Message[]> {
        if (!projectId) return [];

        const { data } = await supabase
            .from('messages')
            .select('*')
            .eq('project_id', projectId)
            .order('created_at', { ascending : false })
            .limit(20);

        return (data || []).reverse();
    }
}