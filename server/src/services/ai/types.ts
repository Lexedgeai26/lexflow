
import { GenerateContentResponse } from "@google/genai";

export interface AnalysisResult {
    docType: string;
    summary: string;
    overallRisk: "GREEN" | "YELLOW" | "RED";
    riskScore: number;
    jurisdictionDetected: string;
    confidence: number;
    skillsApplied: any[];
}

export interface SkillDefinition {
    id: string;
    name: string;
    description: string;
    prompt: string;
}

export interface LegalContext {
    firmName: string;
    lawyerName: string;
    areaOfPractice: string;
    jurisdiction: string;
}

export interface ChatMessage {
    role: 'user' | 'model';
    parts: { text: string }[];
}

export interface LLMProvider {
    analyzeDocument(
        text: string,
        matterType: string,
        activeSkills: SkillDefinition[],
        context: LegalContext
    ): Promise<AnalysisResult>;

    chatWithProject(
        projectName: string,
        documentContent: string,
        analysisSummary: string,
        context: LegalContext,
        message: string,
        history: ChatMessage[]
    ): Promise<ReadableStream<any> | AsyncGenerator<string>>;

    validateKey(): Promise<boolean>;
}
