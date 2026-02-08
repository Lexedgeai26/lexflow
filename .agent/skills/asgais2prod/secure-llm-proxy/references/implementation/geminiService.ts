
import { Case, ValidationReport, UserProfile } from "../types";

// Type definition to match @google/genai Schema structure
const Type = {
    OBJECT: 'OBJECT',
    INTEGER: 'INTEGER',
    STRING: 'STRING',
    ARRAY: 'ARRAY'
};

/**
 * Helper to call the secure backend proxy
 */
async function callLLMProxy(endpoint: string, payload: any): Promise<any> {
    const token = localStorage.getItem('lexreply_token');
    if (!token) throw new Error("Authentication required. Please sign in again.");

    // Endpoint should be /generate, /quota etc. Base URL includes /api/ai
    const res = await fetch(`http://localhost:4000/api/ai${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'AI Service Unavailable');
    }

    // The proxy returns { text: "...", raw: ... }
    const data = await res.json();
    return data;
}

/**
 * Builds a persona-based context string for the lawyer.
 */
const getLawyerContext = (user: UserProfile | null) => {
    if (!user) return "";
    return `
    ### LAWYER PROFILE (SOURCE OF TRUTH FOR STYLE & JURISDICTION)
    - Name: ${user.name}
    - Firm: ${user.firmName}
    - Location: ${user.state}, ${user.country}
    - Practice Areas: ${user.practiceAreas.join(", ")}
    - Scope: Experienced in ${user.state} local laws and procedures.
  `;
};

const VALIDATION_SCHEMA = {
    type: Type.OBJECT,
    properties: {
        totalFactsChecked: { type: Type.INTEGER },
        errorsFoundCount: { type: Type.INTEGER },
        confidenceScore: { type: Type.INTEGER, description: "Score from 0 to 100 based on factual consistency." },
        issues: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    type: { type: Type.STRING, description: "One of: FACTUAL_MISMATCH, LEGAL_REFERENCE, RISK_EXPOSURE, AMBIGUITY" },
                    description: { type: Type.STRING },
                    severity: { type: Type.STRING, description: "One of: LOW, MEDIUM, HIGH" },
                    suggestion: { type: Type.STRING },
                },
                required: ["type", "description", "severity", "suggestion"],
            },
        },
        legalReferences: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    act: { type: Type.STRING },
                    section: { type: Type.STRING },
                    relevance: { type: Type.STRING },
                },
                required: ["act", "section", "relevance"],
            },
        },
        riskSummary: { type: Type.STRING },
        suggestedRevision: { type: Type.STRING, description: "A revised version of the draft with corrected facts and safer language." },
    },
    required: ["totalFactsChecked", "errorsFoundCount", "confidenceScore", "issues", "legalReferences", "riskSummary"],
};

const CASE_EXTRACTION_SCHEMA = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING },
        clientName: { type: Type.STRING },
        opposingParty: { type: Type.STRING },
        jurisdiction: { type: Type.STRING },
        caseNumber: { type: Type.STRING },
        contextText: { type: Type.STRING, description: "A comprehensive summary of all factual details found in the document." },
    },
    required: ["title", "clientName", "opposingParty", "jurisdiction", "contextText"],
};

export const parseLegalDocument = async (base64Data: string, mimeType: string, user: UserProfile | null): Promise<Partial<Case>> => {
    const prompt = `
    Role: Expert Legal Secretary
    Task: Extract structured case information from the provided document (PDF or Image).
    
    ${getLawyerContext(user)}

    Instructions:
    - Identify the case title, client, opponent, and jurisdiction.
    - Create a comprehensive 'contextText' summarizing every factual claim, date, and amount mentioned.
    - If the document is related to ${user?.practiceAreas.join(" or ")}, focus on specific clauses relevant to that area.
  `;

    // Proxy Call
    const response: any = await callLLMProxy('/generate', {
        model: "gemini-2.0-flash-exp", // Standardizing on the working model
        contents: {
            parts: [
                { text: prompt },
                { inlineData: { data: base64Data, mimeType: mimeType } }
            ]
        },
        config: {
            responseMimeType: "application/json",
            responseSchema: CASE_EXTRACTION_SCHEMA,
        }
    });

    try {
        const text = response.text;
        if (!text) throw new Error("Empty response from AI");
        return JSON.parse(text);
    } catch (e) {
        console.error("Extraction error:", e);
        throw new Error("Failed to extract case details. Please ensure the file is clear.");
    }
};

export const validateDraft = async (
    caseContext: Case,
    user: UserProfile | null,
    draftText?: string,
    draftFileData?: { data: string, mimeType: string }
): Promise<ValidationReport> => {

    const promptParts: any[] = [
        {
            text: `
      Role: Senior Legal Auditor
      Task: Validate the provided "Legal Draft" against the "Case Context".
      
      ${getLawyerContext(user)}

      Case Context (Source of Truth):
      - Matter: ${caseContext.title}
      - Client: ${caseContext.clientName}
      - Opponent: ${caseContext.opposingParty}
      - Background: ${caseContext.contextText}
      
      Legal Draft to Audit: ${draftText || 'The draft is provided as an attachment below.'}
      
      Audit Criteria:
      1. Factual Inconsistency: Flag any dates, names, or amounts that differ from the Case Context.
      2. Procedural Risk: Identify statements that admit liability or lack standard denials.
      3. Legal Grounds: Identify applicable sections of the law relevant to ${user?.state || 'the jurisdiction'} and ${user?.practiceAreas.join(", ")}.
      
      Return the results as a structured JSON validation report.
    `}
    ];

    if (draftFileData) {
        promptParts.push({ inlineData: draftFileData });
    }

    // Proxy Call
    const response: any = await callLLMProxy('/generate', {
        model: "gemini-2.0-flash-exp", // Standardizing on the working model
        contents: { parts: promptParts },
        config: {
            responseMimeType: "application/json",
            responseSchema: VALIDATION_SCHEMA,
        }
    });

    try {
        const text = response.text;
        if (!text) throw new Error("AI returned no content.");
        return JSON.parse(text);
    } catch (e) {
        console.error("Validation error:", e);
        throw new Error("Failed to parse validation report. The content may be too complex.");
    }
};

export const generateDraft = async (caseContext: Case, user: UserProfile | null, instructions: string): Promise<string> => {
    const prompt = `
    Role: Professional Legal Counsel at ${user?.firmName || 'the Law Firm'}
    Task: Draft a formal legal reply.
    
    ${getLawyerContext(user)}

    Case Facts:
    - Matter: ${caseContext.title}
    - Client: ${caseContext.clientName}
    - Opposing Party: ${caseContext.opposingParty}
    - Key Facts: ${caseContext.contextText}
    
    Drafting Instructions:
    ${instructions}
    
    Requirements:
    - Tone: Firm, professional, and compliant with ${user?.country} legal standards.
    - Structure: Header (Firm Info), Date, To: [Opponent], Subject: [Matter], Body, Closing.
    - Use placeholders like [DATE] for info missing from context.
  `;

    // Proxy Call
    const response: any = await callLLMProxy('/generate', {
        model: "gemini-2.0-flash-exp", // Standardizing on the working model
        contents: { parts: [{ text: prompt }] },
        config: {}
    });

    const text = response.text;
    if (!text) throw new Error("AI failed to generate draft.");
    return text;
};
