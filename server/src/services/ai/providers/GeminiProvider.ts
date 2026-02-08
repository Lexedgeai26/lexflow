
import { GoogleGenAI, Type } from "@google/genai";
import { LLMProvider, AnalysisResult, SkillDefinition, LegalContext, ChatMessage } from "../types.js";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure env is loaded before class usage if imported directly
dotenv.config({ path: path.resolve(__dirname, '../../../../.env.local') });

const ANALYSIS_SCHEMA = {
    type: Type.OBJECT,
    properties: {
        docType: { type: Type.STRING, description: "Detected document type (e.g. NDA, SaaS, DPA)" },
        summary: { type: Type.STRING, description: "One paragraph summary of the document" },
        overallRisk: { type: Type.STRING, enum: ["GREEN", "YELLOW", "RED"], description: "Overall risk assessment" },
        riskScore: { type: Type.NUMBER, description: "Risk score from 0 (Safe) to 100 (High Risk)" },
        jurisdictionDetected: { type: Type.STRING, description: "Detected jurisdiction" },
        confidence: { type: Type.NUMBER, description: "AI confidence level 0-1" },
        skillsApplied: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING },
                    content: { type: Type.STRING },
                    riskLevel: { type: Type.STRING, enum: ["GREEN", "YELLOW", "RED"] },
                    clauses: { type: Type.ARRAY, items: { type: Type.STRING } },
                    suggestions: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ["title", "content", "riskLevel"]
            }
        }
    },
    required: ["docType", "summary", "overallRisk", "riskScore", "skillsApplied", "jurisdictionDetected", "confidence"]
};

export class GeminiProvider implements LLMProvider {
    private aiInstance: GoogleGenAI | null = null;

    constructor(private apiKey?: string) { }

    private get ai(): GoogleGenAI {
        if (!this.aiInstance) {
            const key = this.apiKey || process.env.GEMINI_API_KEY || process.env.API_KEY;
            if (!key) throw new Error("GEMINI_API_KEY or API_KEY not found in environment variables or user config");
            this.aiInstance = new GoogleGenAI({ apiKey: key });
        }
        return this.aiInstance;
    }

    async analyzeDocument(
        text: string,
        matterType: string,
        activeSkills: SkillDefinition[],
        context: LegalContext
    ): Promise<AnalysisResult> {
        try {
            const skillsContext = activeSkills
                .map(s => `Skill: ${s.name}\nObjective: ${s.description}\nSpecial Instructions: ${s.prompt}`)
                .join('\n\n');

            const response = await this.ai.models.generateContent({
                model: "gemini-1.5-flash",
                contents: `You are currently acting as ${context.lawyerName} at ${context.firmName}. 
        Your expertise is in ${context.areaOfPractice} within the ${context.jurisdiction} jurisdiction.
        
        Perform a comprehensive legal analysis of the following document text for a "${matterType}" project. 
        
        You must apply the following specific legal skills in your analysis as defined by your firm's playbooks:
        ${skillsContext}
  
        Document Content:
        ${text.slice(0, 30000)}`,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: ANALYSIS_SCHEMA as any,
                    systemInstruction: `You are a high-level Legal Operations AI representing ${context.firmName}. 
          You specialize in ${context.areaOfPractice} and ${context.jurisdiction} law.
          
          Strictly follow guardrails: 
          1. Always include a disclaimer that this is NOT legal advice. 
          2. Identify high-risk (RED) clauses that require human review by senior counsel at ${context.firmName}. 
          3. Be concise, actionable, and adhere to ${context.jurisdiction} legal standards.
          4. Organize the "skillsApplied" array based on the skills provided in the prompt.`
                },
            });

            const resultText = response.text;
            if (!resultText) {
                console.error("Gemini returned empty response text");
                throw new Error("No text returned from Gemini");
            }

            try {
                const cleanedText = resultText.trim();
                console.log("Gemini Result Text length:", cleanedText.length);
                return JSON.parse(cleanedText) as AnalysisResult;
            } catch (err: any) {
                console.error("Failed to parse Gemini JSON:", err.message);
                console.debug("Raw Gemini output:", resultText);
                throw new Error("AI returned invalid data format. Please try again.");
            }
        } catch (error: any) {
            console.error("Gemini Analysis Provider Error:", error.message || error);
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

        const systemInstruction = `You are the Matter Assistant for project "${projectName}" at ${context.firmName}.
    Lawyer: ${context.lawyerName}. 
    Jurisdiction: ${context.jurisdiction}. 
    Area of Practice: ${context.areaOfPractice}.
  
    Context of the matter:
    ${documentContent}
  
    AI Analysis Results:
    ${analysisSummary}
  
    Your goal is to answer questions specifically about this project and its documents.
    If the user asks for legal advice, provide a disclaimer and offer analysis based on firm playbooks.
    Be professional, concise, and reference specific sections of the document where possible.`;

        const chat = this.ai.chats.create({
            model: 'gemini-1.5-flash',
            config: {
                systemInstruction,
            },
            history: history as any,
        });

        const result = await chat.sendMessageStream({ message });

        async function* streamGenerator() {
            for await (const chunk of result) {
                const text = chunk.text;
                if (text) yield text;
            }
        }

        return streamGenerator();
    }

    async validateKey(): Promise<boolean> {
        try {
            // Use fetch to bypass any SDK-specific quirks during validation
            const key = this.apiKey || process.env.GEMINI_API_KEY || process.env.API_KEY;
            if (!key) return false;

            // Using the base models endpoint is more robust for validation
            const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;
            const response = await fetch(url);

            if (response.ok) {
                console.log("Gemini Validation Success (via fetch)");
                return true;
            } else {
                const data = await response.json().catch(() => ({}));
                console.error("Gemini Validation Failed:", data.error?.message || response.statusText);
                return false;
            }
        } catch (error: any) {
            console.error("Gemini Validation Network Error:", error.message || error);
            return false;
        }
    }
}
