import { Injectable } from '@nestjs/common';
import { VectorStoreService } from './vectorStore';
import { Document } from '@langchain/core/documents';

@Injectable()
export class IndexerService {
    constructor(private vectorStoreService: VectorStoreService) { }

    async indexCampaign(campaign: any) {
        const content = `
      Campaign: ${campaign.name}
      Industry: ${campaign.industry}
      Location: ${campaign.location}
      Description: ${campaign.description}
      USP: ${campaign.usp}
      Goal: ${campaign.goal}
    `;

        const doc = new Document({
            pageContent: content,
            metadata: {
                id: campaign.id,
                type: 'campaign',
                entityType: 'Campaign',
                workspaceId: campaign.workspaceId,
            }
        });

        await this.vectorStoreService.addDocuments([doc]);
    }

    async indexTask(task: any) {
        const content = `
      GTM Task: ${task.title}
      Phase: ${task.phaseId}
      Category: ${task.category}
      Description: ${task.description}
      Platform: ${task.platform}
      Priority: ${task.priority}
      Outcome: ${task.expectedOutcome}
    `;

        const doc = new Document({
            pageContent: content,
            metadata: {
                id: task.id,
                campaignId: task.campaignId,
                type: 'task',
                entityType: 'GTMTask',
            }
        });

        await this.vectorStoreService.addDocuments([doc]);
    }

    async indexContentAsset(asset: any) {
        // Parse metadata if it's a string
        let metadata = asset.metadata;
        if (typeof metadata === 'string') {
            try {
                metadata = JSON.parse(metadata);
            } catch (e) {
                metadata = {};
            }
        }
        metadata = metadata || {};

        // Check if this is a Strategy/Pricing content
        if (asset.type === 'STRATEGY' && metadata.category) {
            await this.indexStrategyContent(asset, metadata);
            return;
        }

        const content = `
      Content Asset: ${asset.title}
      Type: ${asset.type}
      Platform: ${asset.platform || 'N/A'}
      Content: ${asset.content}
    `;

        const doc = new Document({
            pageContent: content,
            metadata: {
                id: asset.id,
                campaignId: asset.campaignId,
                type: 'content',
                entityType: 'ContentAsset',
                contentType: asset.type,
            }
        });

        await this.vectorStoreService.addDocuments([doc]);
    }

    /**
     * Index Strategy content like Pricing Models, Competitive Analysis, etc.
     */
    async indexStrategyContent(asset: any, meta: any) {
        const category = meta.category || 'STRATEGY';
        let contentText = '';

        // Handle different strategy categories
        if (category === 'PRICING') {
            contentText = this.formatPricingContent(asset);
        } else if (category === 'COMPETITIVE') {
            contentText = this.formatCompetitiveContent(asset);
        } else if (category === 'GUIDANCE') {
            contentText = `
      Implementation Guidance: ${asset.title}
      Related To: ${meta.relatedTo || 'General'}
      ${meta.tierName ? `Tier: ${meta.tierName}` : ''}
      Content: ${asset.content}
      `;
        } else {
            contentText = `
      Strategy Document: ${asset.title}
      Category: ${category}
      Content: ${asset.content}
      `;
        }

        const doc = new Document({
            pageContent: contentText,
            metadata: {
                id: asset.id,
                campaignId: asset.campaignId,
                type: 'strategy',
                entityType: 'StrategyContent',
                category: category,
                ...meta,
            }
        });

        await this.vectorStoreService.addDocuments([doc]);
    }

    /**
     * Format Pricing Model content for better semantic search
     */
    private formatPricingContent(asset: any): string {
        let parsedContent: any = {};
        try {
            parsedContent = typeof asset.content === 'string' ? JSON.parse(asset.content) : asset.content;
        } catch (e) {
            return `Pricing Model: ${asset.title}\nContent: ${asset.content}`;
        }

        const tiers = parsedContent.tiers || (Array.isArray(parsedContent) ? parsedContent : []);

        if (tiers.length === 0) {
            return `Pricing Model: ${asset.title}\nNo pricing tiers defined yet.`;
        }

        const tierDescriptions = tiers.map((tier: any, idx: number) => {
            const features = Array.isArray(tier.features) ? tier.features.join(', ') : (tier.features || 'N/A');
            return `
      Tier ${idx + 1}: ${tier.name || 'Unnamed'}
      Price: ${tier.price || 'N/A'}
      Target Use Case: ${tier.target_use_case || tier.targetUseCase || 'N/A'}
      Features: ${features}`;
        }).join('\n');

        return `
    Pricing & Packaging Model: ${asset.title}
    Total Pricing Tiers: ${tiers.length}
    ${tierDescriptions}
    `;
    }

    /**
     * Format Competitive Analysis content
     */
    private formatCompetitiveContent(asset: any): string {
        let parsedContent: any = {};
        try {
            parsedContent = typeof asset.content === 'string' ? JSON.parse(asset.content) : asset.content;
        } catch (e) {
            return `Competitive Analysis: ${asset.title}\nContent: ${asset.content}`;
        }

        const competitors = parsedContent.competitors || (Array.isArray(parsedContent) ? parsedContent : []);

        if (competitors.length === 0) {
            return `Competitive Analysis: ${asset.title}\n${asset.content}`;
        }

        const competitorDescriptions = competitors.map((comp: any) => {
            return `
      Competitor: ${comp.name || 'Unknown'}
      Strengths: ${Array.isArray(comp.strengths) ? comp.strengths.join(', ') : (comp.strengths || 'N/A')}
      Weaknesses: ${Array.isArray(comp.weaknesses) ? comp.weaknesses.join(', ') : (comp.weaknesses || 'N/A')}
      Positioning: ${comp.positioning || 'N/A'}`;
        }).join('\n');

        return `
    Competitive Analysis: ${asset.title}
    Total Competitors Analyzed: ${competitors.length}
    ${competitorDescriptions}
    `;
    }

    async indexBrandKit(brandKit: any) {
        const content = `
      Brand Kit for Campaign: ${brandKit.campaignId}
      Purpose: ${brandKit.purpose}
      Vision: ${brandKit.vision}
      Mission: ${brandKit.mission}
      Values: ${Array.isArray(brandKit.values) ? brandKit.values.join(', ') : brandKit.values}
      Personality: ${brandKit.personality}
      Voice: ${brandKit.voice}
    `;

        const doc = new Document({
            pageContent: content,
            metadata: {
                id: brandKit.id,
                campaignId: brandKit.campaignId,
                type: 'brand_kit',
                entityType: 'BrandKit',
            }
        });

        await this.vectorStoreService.addDocuments([doc]);
    }

    async indexAudience(audience: any) {
        const content = `
      Audience Profile: ${audience.name}
      Description: ${audience.description}
      Demographics: ${audience.demographics}
      Pain Points: ${Array.isArray(audience.painPoints) ? audience.painPoints.join(', ') : audience.painPoints}
      Behaviors: ${Array.isArray(audience.behaviors) ? audience.behaviors.join(', ') : audience.behaviors}
    `;

        const doc = new Document({
            pageContent: content,
            metadata: {
                id: audience.id,
                campaignId: audience.campaignId,
                type: 'audience',
                entityType: 'AudienceProfile',
            }
        });

        await this.vectorStoreService.addDocuments([doc]);
    }

    async indexOffer(offer: any) {
        const content = `
      Value Proposition / Offer: ${offer.name}
      Type: ${offer.type || 'Core Offer'}
      Description: ${offer.description || 'N/A'}
      Price Point: ${offer.pricePoint || 'N/A'}
      Pricing Model: ${offer.pricingModel || 'N/A'}
      Main Benefit: ${offer.mainBenefit || 'N/A'}
      Key Benefits: ${Array.isArray(offer.keyBenefits) ? offer.keyBenefits.join(', ') : (offer.keyBenefits || 'N/A')}
      Differentiators: ${Array.isArray(offer.differentiators) ? offer.differentiators.join(', ') : (offer.differentiators || 'N/A')}
      Proof Points: ${Array.isArray(offer.proofPoints) ? offer.proofPoints.join(', ') : (offer.proofPoints || 'N/A')}
      Guarantee: ${offer.guarantee || 'N/A'}
    `;

        const doc = new Document({
            pageContent: content,
            metadata: {
                id: offer.id,
                campaignId: offer.campaignId,
                type: 'offer',
                entityType: 'Offer',
                relatedPages: ['value-proposition', 'offers'],
            }
        });

        await this.vectorStoreService.addDocuments([doc]);
    }

    async indexCopyProject(copy: any) {
        const content = `
      Copy Project: ${copy.name || copy.title}
      Objective: ${copy.objective || 'N/A'}
      Platform: ${copy.platform}
      Format: ${copy.format || 'N/A'}
      Generated Copy: ${copy.content || copy.generatedCopy || 'N/A'}
    `;

        const doc = new Document({
            pageContent: content,
            metadata: {
                id: copy.id,
                campaignId: copy.campaignId,
                type: 'copy',
                entityType: 'CopyProject',
            }
        });

        await this.vectorStoreService.addDocuments([doc]);
    }

    async indexBrandProject(brand: any) {
        const content = `
      Brand Project: ${brand.name || brand.title}
      Description: ${brand.description || 'N/A'}
      Identity: ${typeof brand.identityData === 'object' ? JSON.stringify(brand.identityData) : (brand.identityData || 'N/A')}
    `;

        const doc = new Document({
            pageContent: content,
            metadata: {
                id: brand.id,
                campaignId: brand.campaignId,
                type: 'brand_project',
                entityType: 'BrandProject',
            }
        });

        await this.vectorStoreService.addDocuments([doc]);
    }

    async indexEmailProject(email: any) {
        const content = `
      Email Project: ${email.name || email.title}
      Subject Lines: ${email.subjectLines || 'N/A'}
      Campaign Type: ${email.campaignType || 'N/A'}
      Goal: ${email.goal || 'N/A'}
      Sequence: ${typeof email.sequence === 'object' ? JSON.stringify(email.sequence) : (email.sequence || 'N/A')}
    `;

        const doc = new Document({
            pageContent: content,
            metadata: {
                id: email.id,
                campaignId: email.campaignId,
                type: 'email_project',
                entityType: 'EmailMarketingProject',
            }
        });

        await this.vectorStoreService.addDocuments([doc]);
    }

    async indexMarketInsight(insight: any) {
        const content = `
      Market Insight: ${insight.title}
      Category: ${insight.category}
      Source: ${insight.source || 'N/A'}
      Source URL: ${insight.sourceUrl || 'N/A'}
      Insight: ${insight.content}
      Key Takeaway: ${insight.takeaway || insight.keyTakeaway || 'N/A'}
    `;

        const doc = new Document({
            pageContent: content,
            metadata: {
                id: insight.id,
                campaignId: insight.campaignId,
                type: 'market_insight',
                entityType: 'MarketInsight',
            }
        });

        await this.vectorStoreService.addDocuments([doc]);
    }

    // =============================================
    // Delete Operations - Remove from Vector Store
    // =============================================

    /**
     * Delete a document by its entity ID
     */
    async deleteDocument(entityId: string): Promise<boolean> {
        return this.vectorStoreService.deleteByEntityId(entityId);
    }

    /**
     * Delete all documents for a campaign (when campaign is deleted)
     */
    async deleteCampaignDocuments(campaignId: string): Promise<number> {
        return this.vectorStoreService.deleteByFilter({ campaignId });
    }

    /**
     * Delete documents by entity type for a specific campaign
     */
    async deleteByTypeAndCampaign(entityType: string, campaignId: string): Promise<number> {
        return this.vectorStoreService.deleteByFilter({ entityType, campaignId });
    }
}

