
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { AnalysisResult, RiskLevel, SkillDefinition, LegalContext, LegalProject, ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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

export const analyzeDocument = async (
  text: string, 
  matterType: string, 
  activeSkills: SkillDefinition[],
  context: LegalContext
): Promise<AnalysisResult> => {
  try {
    const skillsContext = activeSkills
      .map(s => `Skill: ${s.name}\nObjective: ${s.description}\nSpecial Instructions: ${s.prompt}`)
      .join('\n\n');

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `You are currently acting as ${context.lawyerName} at ${context.firmName}. 
      Your expertise is in ${context.areaOfPractice} within the ${context.jurisdiction} jurisdiction.
      
      Perform a comprehensive legal analysis of the following document text for a "${matterType}" project. 
      
      You must apply the following specific legal skills in your analysis as defined by your firm's playbooks:
      ${skillsContext}

      Document Content:
      ${text.slice(0, 30000)}`,
      config: {
        thinkingConfig: { thinkingBudget: 4000 },
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

    // Use .text property and trim it as per guidelines
    const result = JSON.parse(response.text?.trim() || '{}');
    return result as AnalysisResult;
  } catch (error) {
    console.error("Analysis Error:", error);
    throw error;
  }
};

export const chatWithProject = async (
  project: LegalProject,
  context: LegalContext,
  message: string,
  history: ChatMessage[] = [],
  onChunk: (text: string) => void
) => {
  const docContents = project.documents.map(d => `Document Name: ${d.name}\nContent:\n${d.content}`).join('\n\n');
  const analysisSummary = project.analysis ? `Analysis Summary: ${project.analysis.summary}\nOverall Risk: ${project.analysis.overallRisk}\nRisk Score: ${project.analysis.riskScore}` : 'No analysis performed yet.';

  const systemInstruction = `You are the Matter Assistant for project "${project.name}" at ${context.firmName}.
  Lawyer: ${context.lawyerName}. 
  Jurisdiction: ${context.jurisdiction}. 
  Area of Practice: ${context.areaOfPractice}.

  Context of the matter:
  ${docContents}

  AI Analysis Results:
  ${analysisSummary}

  Your goal is to answer questions specifically about this project and its documents.
  If the user asks for legal advice, provide a disclaimer and offer analysis based on firm playbooks.
  Be professional, concise, and reference specific sections of the document where possible.`;

  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction,
    },
    history: history as any,
  });

  const result = await chat.sendMessageStream({ message });
  let fullText = '';
  for await (const chunk of result) {
    // Ensure .text property is used correctly on chunk
    const text = chunk.text || '';
    fullText += text;
    onChunk(fullText);
  }
  return fullText;
};
