import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RagController } from './rag.controller';
import { AssistantService } from './assistant';
import { IndexerService } from './indexer';
import { VectorStoreService } from './vectorStore';
import { EmbeddingsService } from './embeddings';
import { CacheService } from './cache.service';
import { MetricsService } from './metrics.service';

@Module({
    imports: [ConfigModule],
    controllers: [RagController],
    providers: [
        AssistantService,
        IndexerService,
        VectorStoreService,
        EmbeddingsService,
        CacheService,
        MetricsService,
    ],
    exports: [IndexerService, AssistantService, CacheService, MetricsService],
})
export class RagModule { }

