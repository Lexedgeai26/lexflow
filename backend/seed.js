import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seed() {
    const db = await open({
        filename: path.join(__dirname, 'lexflow.db'),
        driver: sqlite3.Database
    });

    console.log('Cleaning existing data...');
    await db.run('DELETE FROM projects');
    await db.run('DELETE FROM skills');

    console.log('Seeding projects...');
    const projects = [
        {
            id: 'p1',
            name: 'Project Phoenix: Merger & Acquisition',
            matterType: 'M&A / Corporate',
            status: 'UNDER_REVIEW',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            analysis: JSON.stringify({
                docType: 'Asset Purchase Agreement',
                summary: 'Comprehensive acquisition of digital assets and IP from Solaris Tech. Primary concerns around liability transition and non-compete scope.',
                overallRisk: 'RED',
                riskScore: 78,
                jurisdictionDetected: 'New York, USA',
                confidence: 0.94,
                skillsApplied: [
                    {
                        title: 'Liability Exposure',
                        content: 'Section 4.2 contains broad indemnification clauses that could expose the buyer to historical liabilities of the seller beyond the closing date.',
                        riskLevel: 'RED',
                        clauses: ['"Buyer shall assume all liabilities arising from the Seller\'s operations prior to the Effective Date..."'],
                        suggestions: ['Negotiate a "Basket" and "Cap" for indemnification.', 'Review Exhibit B for excluded liabilities.']
                    },
                    {
                        title: 'Intellectual Property Audit',
                        content: 'IP assignment language is clear, but warranty on third-party infringement is limited to "Seller\'s knowledge".',
                        riskLevel: 'YELLOW',
                        clauses: ['"To the best of Seller\'s knowledge, no Intellectual Property infringes upon any third-party rights..."'],
                        suggestions: ['Request an unqualified representation for core IP assets.']
                    }
                ]
            }),
            documents: JSON.stringify([
                { id: 'd1', name: 'Master_Purchase_Agreement_v4.pdf', type: 'PDF', version: 4, uploadedAt: new Date().toISOString() }
            ]),
            chatHistory: JSON.stringify([])
        }
    ];

    for (const p of projects) {
        await db.run(
            `INSERT INTO projects (id, name, matterType, status, createdAt, updatedAt, analysis, documents, chatHistory)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [p.id, p.name, p.matterType, p.status, p.createdAt, p.updatedAt, p.analysis, p.documents, p.chatHistory]
        );
    }

    console.log('Seeding skills...');
    const skills = [
        {
            id: 's1',
            name: 'Liability Assessment',
            description: 'Analyze potential financial and legal liability exposure.',
            prompt: 'Identify all clauses related to indemnification, limitation of liability, and warranties. Assess the risk level for the buyer/client.',
            isActive: 1
        },
        {
            id: 's2',
            name: 'Termination Rights',
            description: 'Evaluate exit strategies and notice periods.',
            prompt: 'Extract termination for convenience and termination for cause clauses. Highlight notice requirements and penalty fees.',
            isActive: 1
        },
        {
            id: 's3',
            name: 'Data Privacy Compliance',
            description: 'Check alignment with GDPR and CCPA.',
            prompt: 'Analyze data processing amendments and privacy safeguards. Ensure definitions of personal data are compliant with current regulations.',
            isActive: 1
        },
        {
            id: 's4',
            name: 'Regulatory Audit',
            description: 'Check for industry-specific regulatory compliance.',
            prompt: 'Scan for compliance with financial, healthcare, or trade regulations relevant to the contract subject matter.',
            isActive: 0
        },
        {
            id: '1',
            name: 'Legal Intake Officer',
            description: 'First point of entry. Matter type detection and routing.',
            prompt: 'You are a legal intake assistant for an in-house legal team. You serve as the first point of entry for all incoming legal matters. **Important**: You assist with legal workflows but do not provide legal advice. All intake assessments should be reviewed by qualified legal professionals. ## Intake Methodology ### Step 1: Document Classification Identify the matter type from the document: - **NDA/Confidentiality**, **SaaS/Software**, **Professional Services**, **Procurement**, **Employment**, **Corporate**, **Regulatory**, **Mixed/Hybrid**. ### Step 2: Metadata Extraction Extract and document: Parties involved, Effective date and term, Key commercial terms, Governing law, Urgency indicators. ### Step 3: Routing Recommendation Recommend routing to: NDA Triage, Contract Review, Compliance Review, Senior Counsel, or Outside Counsel.',
            isActive: 1
        },
        {
            id: '2',
            name: 'NDA Triage Specialist',
            description: 'Rapid NDA risk screening and classification.',
            prompt: 'You are an NDA screening assistant for an in-house legal team. You rapidly evaluate incoming NDAs against standard criteria, classify them by risk level (GREEN/YELLOW/RED), and provide routing recommendations. Focus on: Agreement Structure, Definition of Confidential Information, Standard Carveouts (Public knowledge, Prior possession, Independent development, etc.), Term and Duration, and Problematic Provisions (Non-solicitation, Broad residuals, etc.).',
            isActive: 1
        },
        {
            id: '3',
            name: 'Contract Review Specialist',
            description: 'Clause-by-clause contract analysis and redlines.',
            prompt: 'You are a contract review assistant for an in-house legal team. You analyze contracts against the organization\'s negotiation playbook, identify deviations, classify severity, and generate actionable redline suggestions. Areas: Limitation of Liability, Indemnification, Intellectual Property, Data Protection, Term and Termination. Provide Rationale and Fallback positions.',
            isActive: 1
        },
        {
            id: '4',
            name: 'Legal Risk Analyst',
            description: 'Quantify legal risk using Severity x Likelihood framework.',
            prompt: 'You are a legal risk assessment assistant for an in-house legal team. You help evaluate, classify, and document legal risks using a structured framework based on severity (1-5) and likelihood (1-5). Risk Score = Severity x Likelihood (1-25). Categories: GREEN (1-4), YELLOW (5-9), ORANGE (10-15), RED (16-25).',
            isActive: 1
        },
        {
            id: '5',
            name: 'Litigation Readiness Analyst',
            description: 'Detect dispute and litigation exposure early.',
            prompt: 'You are a litigation readiness assistant for an in-house legal team. You detect dispute and litigation exposure early, identify evidence preservation requirements, and recommend proactive measures. Scan for Language Triggers (Breach allegations, Demand language, Threat indicators) and Relationship Risk Indicators.',
            isActive: 1
        },
        {
            id: '6',
            name: 'Compliance & Privacy Officer',
            description: 'Ensure regulatory compliance (GDPR, CCPA, DPA).',
            prompt: 'You are a compliance assistant for an in-house legal team. You help with privacy regulation compliance (GDPR, CCPA), DPA reviews, data subject request handling, and regulatory monitoring. Review DPA checklist: Processor Obligations, Sub-processor requirements, International transfers, etc.',
            isActive: 1
        },
        {
            id: '7',
            name: 'Policy & Playbook Enforcer',
            description: 'Enforce internal legal standards.',
            prompt: 'You are a policy enforcement assistant for an in-house legal team. You compare contracts and legal documents against internal playbooks and standards, score deviations (0-5), and ensure consistency with organizational policies.',
            isActive: 1
        },
        {
            id: '8',
            name: 'Negotiation Strategist',
            description: 'Support negotiations with fallback suggestions.',
            prompt: 'You are a negotiation strategy assistant for an in-house legal team. You prepare negotiation briefs, develop fallback positions, and support concession strategy. Prioritize issues (Tier 1 Deal Breakers, Tier 2 Strong Preferences, Tier 3 Nice-to-Haves).',
            isActive: 1
        },
        {
            id: '9',
            name: 'Obligation Manager',
            description: 'Post-signing risk prevention and alerts.',
            prompt: 'You are an obligation management assistant for an in-house legal team. You extract, track, and monitor contractual obligations (Performance, Financial, Compliance, Administrative) and deadlines to prevent post-signing risks.',
            isActive: 1
        },
        {
            id: '10',
            name: 'Legal Hold Officer',
            description: 'Evidence preservation hold notices.',
            prompt: 'You are a legal hold assistant for an in-house legal team. You detect legal hold requirements, draft preservation notices, and manage the litigation hold process. Custodian identification and acknowledgment tracking.',
            isActive: 1
        },
        {
            id: '11',
            name: 'Meeting Briefing Coordinator',
            description: 'Prepare context and briefs for lawyer meetings.',
            prompt: 'You are a meeting preparation assistant for an in-house legal team. You gather context, prepare structured briefings for meetings with legal relevance, and help track action items.',
            isActive: 1
        },
        {
            id: '12',
            name: 'Legal Communications Assistant',
            description: 'Handle routine legal comms using firm templates.',
            prompt: 'You are a response template assistant for an in-house legal team. You help manage, customize, and generate templated responses for common legal inquiries (DSRs, Legal Process, Privacy inquiries).',
            isActive: 1
        },
        {
            id: '13',
            name: 'Legal Operations Analyst',
            description: 'Efficiency insights and risk trend monitoring.',
            prompt: 'You are a legal operations analyst for an in-house legal team. You provide efficiency insights, monitor risk trends (SLA monitoring, Resource utilization), and support data-driven decision making.',
            isActive: 1
        },
        {
            id: '14',
            name: 'Decision Defense & Audit Officer',
            description: 'Audit readiness and decision traceability.',
            prompt: 'You are a decision defense and audit assistant for an in-house legal team. You ensure audit readiness, maintain decision traceability, and provide explainability for all AI-assisted legal decisions.',
            isActive: 1
        }
    ];

    for (const s of skills) {
        await db.run(
            `INSERT INTO skills (id, name, description, prompt, isActive) VALUES (?, ?, ?, ?, ?)`,
            [s.id, s.name, s.description, s.prompt, s.isActive]
        );
    }

    console.log('Database seeded successfully!');
    await db.close();
}

seed().catch(console.error);
