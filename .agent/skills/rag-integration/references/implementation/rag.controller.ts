import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { AssistantService } from './assistant';
import { VectorStoreService } from './vectorStore';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('rag')
export class RagController {
    constructor(
        private assistantService: AssistantService,
        private vectorStoreService: VectorStoreService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post('ask')
    async askAssistant(@Request() req: any, @Body() body: { question: string; context?: any }) {
        return this.assistantService.ask(body.question, body.context);
    }

    @UseGuards(JwtAuthGuard)
    @Get('stats')
    async getStats() {
        const counts = await this.vectorStoreService.getDocumentCounts();
        const total = Object.values(counts).reduce((sum: number, c: number) => sum + c, 0);
        return {
            status: 'ok',
            totalDocuments: total,
            documentsByType: counts,
            timestamp: new Date().toISOString(),
        };
    }
}

