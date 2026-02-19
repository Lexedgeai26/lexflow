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
        },
        {
            id: 'p2',
            name: 'CloudX Enterprise MSA',
            matterType: 'Technology / SaaS',
            status: 'APPROVED',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            analysis: JSON.stringify({
                docType: 'Master Service Agreement',
                summary: 'Standard SaaS onboarding for enterprise-level cloud services. Data privacy and SLA terms are within industry standards.',
                overallRisk: 'GREEN',
                riskScore: 22,
                jurisdictionDetected: 'Delaware, USA',
                confidence: 0.98,
                skillsApplied: [
                    {
                        title: 'SLA Review',
                        content: '99.9% uptime commitment with reasonable service credits. Exception for scheduled maintenance is clearly defined.',
                        riskLevel: 'GREEN',
                        clauses: ['"Provider guarantees 99.9% uptime per calendar month..."'],
                        suggestions: ['Confirm maintenance windows align with regional business hours.']
                    }
                ]
            }),
            documents: JSON.stringify([
                { id: 'd2', name: 'CloudX_MSA_Final.docx', type: 'DOCX', version: 1, uploadedAt: new Date().toISOString() }
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
        { id: 's1', name: 'Liability Assessment', description: 'Analyze potential financial and legal liability exposure.', prompt: 'Identify all clauses related to indemnification, limitation of liability, and warranties. Assess the risk level for the buyer/client.', isActive: 1 },
        { id: 's2', name: 'Termination Rights', description: 'Evaluate exit strategies and notice periods.', prompt: 'Extract termination for convenience and termination for cause clauses. Highlight notice requirements and penalty fees.', isActive: 1 },
        { id: 's3', name: 'Data Privacy Compliance', description: 'Check alignment with GDPR and CCPA.', prompt: 'Analyze data processing amendments and privacy safeguards. Ensure definitions of personal data are compliant with current regulations.', isActive: 1 },
        { id: 's4', name: 'Regulatory Audit', description: 'Check for industry-specific regulatory compliance.', prompt: 'Scan for compliance with financial, healthcare, or trade regulations relevant to the contract subject matter.', isActive: 0 }
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
