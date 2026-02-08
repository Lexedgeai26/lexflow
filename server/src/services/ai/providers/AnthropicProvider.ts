
import { LLMProvider, AnalysisResult, SkillDefinition, LegalContext, ChatMessage } from "../types.js";

export class AnthropicProvider implements LLMProvider {
    constructor(private apiKey?: string) { }

    async analyzeDocument(
        text: string,
        matterType: string,
        activeSkills: SkillDefinition[],
        context: LegalContext
    ): Promise<AnalysisResult> {
        if (!this.apiKey) throw new Error("Anthropic API Key not provided");

        const skillsContext = activeSkills
            .map(s => `Skill: ${s.name}\nObjective: ${s.description}\nSpecial Instructions: ${s.prompt}`)
            .join('\n\n');

        const systemPrompt = `You are a high-level Legal Operations AI representing ${context.firmName}. 
        You specialize in ${context.areaOfPractice} and ${context.jurisdiction} law.
        
        Strictly follow guardrails: 
        1. Always include a disclaimer that this is NOT legal advice. 
        2. Identify high-risk (RED) clauses that require human review by senior counsel at ${context.firmName}. 
        3. Be concise, actionable, and adhere to ${context.jurisdiction} legal standards.
        4. Organize the "skillsApplied" array based on the skills provided in the prompt.
        
        You must respond in valid JSON format ONLY. 
        Matching this schema:
        {
            "docType": "string",
            "summary": "string",
            "overallRisk": "GREEN" | "YELLOW" | "RED",
            "riskScore": number (0-100),
            "jurisdictionDetected": "string",
            "confidence": number (0-1),
            "skillsApplied": [
                {
                    "title": "string",
                    "content": "string",
                    "riskLevel": "GREEN" | "YELLOW" | "RED",
                    "clauses": ["string"],
                    "suggestions": ["string"]
                }
            ]
        }`;

        const userPrompt = `You are currently acting as ${context.lawyerName} at ${context.firmName}. 
        Your expertise is in ${context.areaOfPractice} within the ${context.jurisdiction} jurisdiction.
        
        Perform a comprehensive legal analysis of the following document text for a "${matterType}" project. 
        
        You must apply the following specific legal skills in your analysis as defined by your firm's playbooks:
        ${skillsContext}
  
        Document Content:
        ${text.slice(0, 30000)}`;

        try {
            const response = await fetch("https://api.anthropic.com/v1/messages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": this.apiKey,
                    "anthropic-version": "2023-06-01"
                },
                body: JSON.stringify({
                    model: "claude-3-5-sonnet-20240620",
                    max_tokens: 4096,
                    system: systemPrompt,
                    messages: [
                        { role: "user", content: userPrompt }
                    ]
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error?.message || "Anthropic Analysis Failed");
            }

            const data = await response.json();
            const resultText = data.content[0].text;
            // Extract JSON if Anthropic includes conversational filler (though SONNET is usually good about system prompt compliance)
            const jsonMatch = resultText.match(/\{[\s\S]*\}/);
            const jsonString = jsonMatch ? jsonMatch[0] : resultText;

            return JSON.parse(jsonString) as AnalysisResult;
        } catch (error) {
            console.error("Anthropic Analysis Error:", error);
            throw error;
        }
    }

    async chatWithProject(
        projectName: string,
        documentContent: string,
        analysisSummary: string,
        context: LegalContext,
        message: string,
        history: ChatMessage[]
    ): Promise<AsyncGenerator<string>> {
        if (!this.apiKey) throw new Error("Anthropic API Key not provided");

        const systemInstruction = `You are the Matter Assistant for project "${projectName}" at ${context.firmName}.
        Lawyer: ${context.lawyerName}. 
        Jurisdiction: ${context.jurisdiction}. 
        Area of Practice: ${context.areaOfPractice}.
      
        Context of the matter:
        ${documentContent.slice(0, 20000)}
      
        AI Analysis Results:
        ${analysisSummary}
      
        Your goal is to answer questions specifically about this project and its documents.
        If the user asks for legal advice, provide a disclaimer and offer analysis based on firm playbooks.
        Be professional, concise, and reference specific sections of the document where possible.`;

        const messages = history.map(m => ({
            role: m.role === 'model' ? 'assistant' : 'user' as const,
            content: m.parts.map(p => p.text).join('')
        }));
        messages.push({ role: 'user' as const, content: message });

        const response = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": this.apiKey,
                "anthropic-version": "2023-06-01"
            },
            body: JSON.stringify({
                model: "claude-3-5-sonnet-20240620",
                max_tokens: 1024,
                system: systemInstruction,
                messages,
                stream: true
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || "Anthropic Chat Failed");
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        async function* streamGenerator() {
            if (!reader) return;
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                const lines = chunk.split('\n').filter(line => line.trim() !== '');

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        try {
                            const data = JSON.parse(line.slice(6));
                            if (data.type === 'content_block_delta') {
                                yield data.delta.text;
                            }
                        } catch (e) {
                            // Skip invalid JSON
                        }
                    }
                }
            }
        }

        return streamGenerator();
    }

    async validateKey(): Promise<boolean> {
        if (!this.apiKey) return false;
        try {
            const response = await fetch("https://api.anthropic.com/v1/messages", {
                method: "POST",
                headers: {
                    "x-api-key": this.apiKey,
                    "anthropic-version": "2023-06-01",
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    model: "claude-3-haiku-20240307",
                    max_tokens: 1,
                    messages: [{ role: "user", content: "Hi" }]
                })
            });
            return response.status === 200;
        } catch (error) {
            console.error("Anthropic Validation Error:", error);
            return false;
        }
    }
}
