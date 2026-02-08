import { ConfigService } from '@nestjs/config';

export const getRagConfig = (configService: ConfigService) => ({
    openAiApiKey: configService.get<string>('OPENAI_API_KEY'),
    llmModel: configService.get<string>('LLM_MODEL') || 'gpt-4o-mini',
    vectorStorePath: configService.get<string>('VECTOR_STORE_PATH') || './vector_store',
});

