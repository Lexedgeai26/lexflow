
export enum RiskLevel {
  LOW = 'GREEN',
  MEDIUM = 'YELLOW',
  HIGH = 'RED'
}

export enum ProjectStatus {
  DRAFT = 'DRAFT',
  ANALYZING = 'ANALYZING',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  ESCALATED = 'ESCALATED',
  CLOSED = 'CLOSED'
}

export interface User {
  id: string;
  email: string;
  firmName: string;
  lawyerName: string;
  areaOfPractice: string;
  jurisdiction: string;
  llmProvider?: 'openai' | 'claude' | 'gemini';
  llmApiKey?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export interface SkillDefinition {
  id: string;
  name: string;
  description: string;
  prompt: string;
  isActive: boolean;
}

export interface LegalContext {
  firmName: string;
  lawyerName: string;
  areaOfPractice: string;
  jurisdiction: string;
}

export interface LegalDocument {
  id: string;
  name: string;
  content: string;
  type: string;
  version: number;
  uploadedAt: string;
}

export interface AnalysisSection {
  title: string;
  content: string;
  riskLevel: RiskLevel;
  clauses?: string[];
  suggestions?: string[];
}

export interface AnalysisResult {
  docType: string;
  summary: string;
  overallRisk: RiskLevel;
  riskScore: number; // 0-100
  skillsApplied: AnalysisSection[];
  jurisdictionDetected: string;
  confidence: number;
}

export interface LegalProject {
  id: string;
  name: string;
  matterType: string;
  status: ProjectStatus;
  documents: LegalDocument[];
  analysis?: AnalysisResult;
  createdAt: string;
  updatedAt: string;
  owner: string;
  chatHistory?: ChatMessage[];
}
